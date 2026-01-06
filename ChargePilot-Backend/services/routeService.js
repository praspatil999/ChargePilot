import mbxDirections from "@mapbox/mapbox-sdk/services/directions.js";
import polyline from "@mapbox/polyline";
import * as turf from "@turf/turf";

// Initialize the directions service
const directionsClient = mbxDirections({
  accessToken: process.env.MAPBOX_API_KEY,
});

/**
 * Fetches route, decodes polyline, and samples coordinates every 20km.
 * @param {Array} start - [lng, lat]
 * @param {Array} end - [lng, lat]
 */
export const getSampledRoutePoints = async (start, end) => {
  try {
    // --- STEP 3: Fetch Route from Mapbox ---
    const response = await directionsClient
      .getDirections({
        profile: "driving",
        waypoints: [{ coordinates: start }, { coordinates: end }],
        geometries: "polyline",
        overview: "full",
      })
      .send();

    const route = response.body.routes[0];
    const distanceKm = route.distance / 1000;
    const geometry = route.geometry; // The encoded polyline string

    // --- STEP 4: Decode & Sample Route ---

    // 1. Decode polyline: returns Array of [lat, lng]
    const decodedCoords = polyline.decode(geometry);

    // 2. Map to [lng, lat] for Turf.js compatibility
    const lngLatCoords = decodedCoords.map(([lat, lng]) => [lng, lat]);
    const line = turf.lineString(lngLatCoords);

    // 3. Sample points every 20km
    const samplingInterval = 20;
    const sampledPoints = [];

    for (let i = 0; i <= distanceKm; i += samplingInterval) {
      const segment = turf.along(line, i, { units: "kilometers" });
      sampledPoints.push(segment.geometry.coordinates);
    }

    // Ensure the final destination is included
    const lastPoint = sampledPoints[sampledPoints.length - 1];
    if (JSON.stringify(lastPoint) !== JSON.stringify(end)) {
      sampledPoints.push(end);
    }

    return {
      success: true,
      totalDistance: `${distanceKm.toFixed(2)} km`,
      pointsToSearch: sampledPoints, // These are your "search anchors"
      polyline: geometry,
    };
  } catch (error) {
    console.error("Mapbox Route Error:", error);
    return { success: false, error: error.message };
  }
};

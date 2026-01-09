// batteryHealthService.js - Battery Health Algorithm
export const batteryHealthService = {
  
  // Calculate battery degradation risk score (0-100)
  calculateDegradationRisk(batteryHealth, chargeLevel, chargingSpeed, temperature = 25) {
    let riskScore = 0;
    
    // Factor 1: Current battery health (30% weight)
    if (batteryHealth < 70) riskScore += 30;
    else if (batteryHealth < 80) riskScore += 20;
    else if (batteryHealth < 90) riskScore += 10;
    
    // Factor 2: Charge level (25% weight)
    // Charging to 100% regularly degrades battery
    if (chargeLevel > 90) riskScore += 25;
    else if (chargeLevel > 80) riskScore += 15;
    else if (chargeLevel < 20) riskScore += 10; // Deep discharge also bad
    
    // Factor 3: Charging speed (25% weight)
    // Fast charging generates more heat
    if (chargingSpeed === 'ultra-fast' || chargingSpeed > 150) riskScore += 25;
    else if (chargingSpeed === 'fast' || chargingSpeed > 50) riskScore += 15;
    else if (chargingSpeed === 'slow' || chargingSpeed < 22) riskScore += 5;
    
    // Factor 4: Temperature (20% weight)
    // Extreme temperatures accelerate degradation
    if (temperature > 35 || temperature < 5) riskScore += 20;
    else if (temperature > 30 || temperature < 10) riskScore += 10;
    
    return Math.min(riskScore, 100);
  },
  
  // Get charging recommendation based on battery health
  getChargingRecommendation(batteryHealth, currentCharge, targetCharge, chargingSpeed) {
    const riskScore = this.calculateDegradationRisk(
      batteryHealth,
      targetCharge,
      chargingSpeed
    );
    
    let recommendation = {
      riskLevel: '',
      color: '',
      icon: '',
      title: '',
      message: '',
      tips: [],
      optimalTarget: targetCharge,
      optimalSpeed: chargingSpeed
    };
    
    // High Risk (70-100)
    if (riskScore >= 70) {
      recommendation.riskLevel = 'high';
      recommendation.color = 'red';
      recommendation.icon = '⚠️';
      recommendation.title = 'High Battery Degradation Risk';
      recommendation.message = 'This charging pattern may significantly reduce battery lifespan.';
      recommendation.tips = [
        `Reduce target charge to ${Math.min(targetCharge - 10, 80)}% to minimize stress`,
        'Consider using slower charging speed',
        'Avoid charging in extreme temperatures',
        'Battery health is already low - gentle charging recommended'
      ];
      recommendation.optimalTarget = Math.min(80, targetCharge);
      recommendation.optimalSpeed = 'slow';
    }
    // Medium Risk (40-69)
    else if (riskScore >= 40) {
      recommendation.riskLevel = 'medium';
      recommendation.color = 'orange';
      recommendation.icon = '⚡';
      recommendation.title = 'Moderate Battery Degradation Risk';
      recommendation.message = 'Some battery stress expected with this charging pattern.';
      recommendation.tips = [
        targetCharge > 85 ? 'Consider charging to 80-85% for daily use' : '',
        chargingSpeed === 'ultra-fast' ? 'Fast charging is convenient but increases wear' : '',
        'Keep battery between 20-80% when possible',
        'Use fast charging only when necessary'
      ].filter(Boolean);
      recommendation.optimalTarget = Math.min(85, targetCharge);
      recommendation.optimalSpeed = chargingSpeed === 'ultra-fast' ? 'fast' : chargingSpeed;
    }
    // Low Risk (0-39)
    else {
      recommendation.riskLevel = 'low';
      recommendation.color = 'green';
      recommendation.icon = '✅';
      recommendation.title = 'Optimal Charging Pattern';
      recommendation.message = 'This charging pattern is gentle on your battery.';
      recommendation.tips = [
        'Great! This charging pattern helps maximize battery lifespan',
        'Continue avoiding full charges for daily use',
        'Your battery health will thank you long-term'
      ];
      recommendation.optimalTarget = targetCharge;
      recommendation.optimalSpeed = chargingSpeed;
    }
    
    return recommendation;
  },
  
  // Calculate estimated battery lifespan reduction
  estimateLifespanImpact(batteryHealth, chargingPattern) {
    const { frequency, avgTargetCharge, avgSpeed } = chargingPattern;
    
    // Base lifespan: 8-10 years for healthy battery
    let baseLifespan = 10;
    
    // Reduce based on health
    if (batteryHealth < 70) baseLifespan -= 3;
    else if (batteryHealth < 80) baseLifespan -= 2;
    else if (batteryHealth < 90) baseLifespan -= 1;
    
    // Reduce based on charging habits
    if (avgTargetCharge > 90) baseLifespan -= 1.5;
    if (avgSpeed === 'ultra-fast' && frequency === 'daily') baseLifespan -= 1;
    
    return {
      estimatedYears: Math.max(baseLifespan, 2),
      comparedToOptimal: baseLifespan < 8 ? `${((10 - baseLifespan) * 10).toFixed(0)}% shorter` : 'Optimal'
    };
  },
  
  // Get battery health tips
  getBatteryHealthTips(batteryHealth) {
    const tips = [
      {
        title: '🎯 Sweet Spot: 20-80%',
        description: 'Keep your battery between 20-80% for daily use to maximize lifespan.'
      },
      {
        title: '🐌 Slow is Smooth',
        description: 'Use slow charging overnight when possible. Fast charging only when needed.'
      },
      {
        title: '🌡️ Temperature Matters',
        description: 'Avoid charging in extreme heat or cold. Park in shade during summer charging.'
      },
      {
        title: '🔋 Full Charge for Trips',
        description: 'Only charge to 100% before long trips, not for daily commutes.'
      },
      {
        title: '⚡ Minimize Fast Charging',
        description: 'Fast charging generates heat. Limit to 1-2 times per week if possible.'
      }
    ];
    
    if (batteryHealth < 80) {
      tips.unshift({
        title: '⚠️ Battery Health Alert',
        description: 'Your battery health is below optimal. Extra care needed to slow degradation.'
      });
    }
    
    return tips;
  }
};
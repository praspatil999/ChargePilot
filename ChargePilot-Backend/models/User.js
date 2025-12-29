import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],

    defaultVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  { timestamps: true }
);

// This adds:
// username, hash, salt
// register(), authenticate(), serializeUser(), deserializeUser()
UserSchema.plugin(passportLocalMongoose.default || passportLocalMongoose, {
  usernameField: "email",
});

export default mongoose.model("User", UserSchema);

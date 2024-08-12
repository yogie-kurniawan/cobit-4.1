import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    nama: {
      type: String,
      required: true,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    noTelepon: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

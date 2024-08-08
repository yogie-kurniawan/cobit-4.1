import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
    noTelepon: {
      type: String,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    gambar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", UserSchema);

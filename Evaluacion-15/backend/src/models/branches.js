import { Schema, model } from "mongoose";

const branchesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "", // opcional
    },
    birthday: {
      type: Date,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    telephone: {
      type: String, // Número como string para no tener problemas con ceros o formatos
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("branches", branchesSchema);

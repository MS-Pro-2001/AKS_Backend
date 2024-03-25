import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      minLength: [3, "First Name must containes atleast 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      minLength: [3, "Last Name must containes atleast 3 characters"],
    },

    phone_no: {
      type: String,
      required: true,
      match: [/^(?:\+?91|0)?[789]\d{9}$/, "Invalid Phone Number"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    ward: {
      type: String,
      required: [true, "ward cannot be empty"],
      lowercase: true,
    },

    dob: {
      type: String,
      required: [true, "Date of birth cannot be empty"],
      trim: true,
    },
    familyPhoto: {
      type: String,
    },
    familyDetails: [
      {
        type: mongoose.Types.ObjectId,
        ref: "familyDetails",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

// models/Patient.js
const mongoose = require("mongoose");
const User = require("./User"); // keep if you need the ref

const patientSchema = new mongoose.Schema(
  {
    personalInfo: {
      firstName: String,
      lastName: String,
      dob: Date,
      gender: String,
      phone: String,
      email: String,
      address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
    },
    medicalInfo: {
      allergies: [String],
      chronicDiseases: [String],
      currentMedications: [String],
      pastSurgeries: [String],
      immunizations: [String],
    },
    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link here
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" }],
  },
  { timestamps: true }
);

// ✅ Export the Patient model
module.exports = mongoose.model("Patient", patientSchema);

const bcrypt = require("bcryptjs");
const Patient = require("../model/Patient");
const User = require("../model/User");

// CREATE Patient (and linked User)
const createPatient = async (req, res, next) => {
  try {
    const { firstName, lastName, dob, gender, phone, email, address, password, emergencyContact } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create User
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "patient",
      isActive: true
    });
    await user.save();

    // create Patient and link User
    const patient = new Patient({
      personalInfo: {
        firstName,
        lastName,
        dob,
        gender,
        phone,
        email,
        address
      },
      emergencyContact,
      user: user._id
    });
    await patient.save();

    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (err) {
    next(err);
  }
};

// GET all Patients
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().populate("user", "name email role isActive");
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

// GET Patient by ID
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user", "name email role isActive");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

// UPDATE Patient
const updatePatient = async (req, res, next) => {
  try {
    const { firstName, lastName, dob, gender, phone, email, address, emergencyContact } = req.body;

    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // update personal info
    patient.personalInfo = { firstName, lastName, dob, gender, phone, email, address };
    patient.emergencyContact = emergencyContact;

    await patient.save();
    res.json({ message: "Patient updated successfully", patient });
  } catch (err) {
    next(err);
  }
};

// DELETE Patient (also remove linked User)
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // delete linked User
    await User.findByIdAndDelete(patient.user);

    // delete Patient
    await Patient.findByIdAndDelete(req.params.id);

    res.json({ message: "Patient and linked User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
};

const mongoose = require('mongoose');

// Placeholder for using Mongoose with Patient collection
const PrescriptionSchema = new mongoose.Schema({
  prescriptionName : String,
  prescribedDate : Date,
  expireDate : Date,
  filled : Boolean,
  filledDate : Date

});

const PatientSchema = new mongoose.Schema({
  PATIENT_ID : String,
  PRESCRIPTIONS : [PrescriptionSchema]
});

module.exports = mongoose.model('Patient', PatientSchema, "patients");

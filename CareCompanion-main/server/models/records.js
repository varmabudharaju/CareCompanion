// const mongoose = require('mongoose');

// const recordSchema = new mongoose.Schema({
// //   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
// //   patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
//   doctorId:{type: String},
//   patientId:{type: String},
//   date: { type: Date, default: Date.now },
//   diagnosis: { type: String }, // Disease diagnosed
//   precautions: [{ 
//     type: String 
//   }], // List of precautions
//   instructions: { type: String }, // Additional instructions or notes
//   // Attachments or media can be added if necessary
// });

// module.exports = mongoose.model('Record', recordSchema);


const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  text: String, // Text of the instruction
  // You can add more fields to instruction if needed
});

const precautionSchema = new mongoose.Schema({
  name: String, // Name of the precaution
  instructions: [instructionSchema] // Array of instructions
});

const diagnosisSchema = new mongoose.Schema({
  disease: String, // Name of the disease
  precautions: [precautionSchema] // Array of precautions
});

const recordSchema = new mongoose.Schema({
  doctorId: { type: String },
  patientId: { type: String },
  date: { type: Date, default: Date.now },
  diagnoses: [diagnosisSchema] // Array of diagnoses
});

module.exports = mongoose.model('Record', recordSchema);


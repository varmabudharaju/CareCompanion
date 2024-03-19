const router = require("express").Router();
const Record = require('../models/records');
const User = require('../models/user');
  
router.post('/', async (req, res) => {
  try {
      const { doctorId, patientId, disease, precaution, instructions } = req.body;

      console.log(req.body);

      // Find the existing record for the same doctor, patient, and date
      let record = await Record.findOne({ 
          doctorId, 
          patientId, 
          date: { $gte: new Date().setHours(0,0,0,0), $lt: new Date().setHours(23,59,59,999) } 
      });

      if (record) {
          // Update logic
          let diseaseFound = record.diagnoses.find(d => d.disease === disease);

          if (diseaseFound) {
              let precFound = diseaseFound.precautions.find(p => p.name === precaution);
              if (precFound) {
                  // Append instructions
                  precFound.instructions.push({ text: instructions });
              } else {
                  // Append new precaution
                  diseaseFound.precautions.push({ 
                      name: precaution, 
                      instructions: [{ text: instructions }]
                  });
              }
          } else {
              // Append new disease
              record.diagnoses.push({ 
                  disease, 
                  precautions: [{ 
                      name: precaution, 
                      instructions: [{ text: instructions }]
                  }]
              });
          }

          await record.save();
      } else {
          // Create a new record if not found
          const newRecord = new Record({
              doctorId,
              patientId,
              diagnoses: [{ 
                  disease, 
                  precautions: [{ 
                      name: precaution, 
                      instructions: [{ text: instructions }]
                  }]
              }]
          });
          await newRecord.save();
          record = newRecord;
      }

      res.json(record);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});



// GET endpoint to retrieve records for a specific patient
// router.get('/patient/:patientId', async (req, res) => {
//     try {
//       const patientId = req.params.patientId;
//       const records = await Record.find({ patientId }).populate('doctorId', 'firstName lastName');
//       res.json(records);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   });

router.get('/patient/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const records = await Record.find({ patientId }).populate('doctorId', 'firstName lastName');

    // Check if any records were found
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No records found for the given patient ID.' });
    }

    res.json(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


  // router.get('/doctor/:doctorId', async (req, res) => {
  //   try {
  //     const doctorId = req.params.doctorId;
  //     //const records = await User.findOne({ doctorId }).populate('doctorId', 'firstName', 'lastName');
  //     const records = await User.findOne({ doctorId: req.body.doctorId});
  //     res.json(records);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server error');
  //   }
  // });


//   router.get('/appointment/:doctorId', async (req, res) => {
//     try {
//       const doctorId = req.params.doctorId;
//       const records = await Record.find({ patientId }).populate('doctorId', 'firstName lastName');
//       res.json(records);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   });
  

module.exports = router;

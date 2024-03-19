import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, AppBar, Toolbar, IconButton, FormControl, FormHelperText, Paper, Chip, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './InstructionsForm.css'; // Ensure this CSS file is created for styling

function InstructionsForm() {
  const location = useLocation();
  const { disease, precaution, patientId } = location.state || {}; // Retrieve passed state
  const [instructions, setInstructions] = useState(''); // State for instructions text
  const [file, setFile] = useState(null); // State for uploaded file
  const doctorId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Instantiate useNavigate

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update state with selected file
  };

  
  const getPOSTData = () => {
    return {
      patientId : patientId,
      doctorId : doctorId,
      disease : disease,
      precaution: precaution,
      instructions :  instructions
    };
    
  }

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };


const handleSubmit = async (event) => {
    event.preventDefault();

    //const doctorId = localStorage.getItem("userId"); // Replace with actual doctor ID
    //const patientId = patientId; // Replace with actual patient ID


  //  const diagnoses= [
  //       {
  //         disease: "Common Cold",
  //         precautions: [
  //           {
  //             name: "Rest",
  //             instructions: [
  //               { text: "Take plenty of rest." },
  //               { text: "Stay in bed if possible." }
  //             ]
  //           },
  //           {
  //             name: "Stay Hydrated",
  //             instructions: [
  //               { text: "Drink plenty of fluids." },
  //               { text: "Avoid caffeine and alcohol." }
  //             ]
  //           }
  //         ]
  //       }
  //     ]

      // const recordData = {
      //   doctorId,
      //   patientId,
      //   diagnoses
      // };
  
      const requestData = getPOSTData();
      console.log(JSON.stringify(requestData));
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      };
  
      // if (file) {
      //   // If file is included, use FormData
      //   const formData = new FormData();
      //   formData.append('doctorId', doctorId);
      //   formData.append('patientId', patientId);
      //   formData.append('diagnoses', JSON.stringify(diagnoses));
      //   formData.append('file', file);
      //   requestOptions.body = formData;
      //   delete requestOptions.headers['Content-Type']; // Remove the content-type header
      // }
  
      try {
        const response = await fetch('http://localhost:9000/api/records', requestOptions);
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Success:', result);
        navigate('/doctor', { state: { patientId: patientId } });
        // Handle success (e.g., show a success message or redirect)
      } catch (error) {
        console.error('Error:', error);
        // Handle errors (e.g., show an error message)
      }
    //console.log(diagnoses);
  };






  return (
    <div className="instructions-form">
      <AppBar position="static">
        <Toolbar>
         <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Instructions for {precaution}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="selection-info">
        <Chip label={`Disease: ${disease}`} color="primary" variant="outlined" />
        <Chip label={`Precaution: ${precaution}`} color="secondary" variant="outlined" />
      </div>

      <Paper className="form-content">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Instructions"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={instructions}
            onChange={handleInstructionsChange}
            margin="normal"
          />

          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControl margin="normal">
                <input
                  accept="image/*,video/*,audio/*,.pdf"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button variant="contained" color="primary" component="span" size="small">
                    Upload File
                  </Button>
                </label>
                <FormHelperText>Attach media</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs>
              {file && <Typography variant="body2">{file.name}</Typography>}
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default InstructionsForm;

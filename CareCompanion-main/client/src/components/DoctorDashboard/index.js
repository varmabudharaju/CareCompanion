// DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, AppBar, Toolbar, IconButton, Snackbar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './DoctorDashboard.css';

function DoctorDashboard() {
  const [patientId, setPatientId] = useState('');
  const [patientConnected, setPatientConnected] = useState(false);
  const location = useLocation();
  const [error, setError] = useState('');
  useEffect(()=>{
    const userId = location.state?.patientId;
    if (userId) {
      setPatientId(userId);
      setPatientConnected(true);
    }
  },[]);

  const navigate = useNavigate();

  // Array of diseases to be displayed as tiles
  const diseases = [
    { name: 'Diabetes(Type 2)', imageUrl: '/diabetes.png', description: 'Description for Cold' },
    { name: 'Asthma', imageUrl: '/Asthama.png', description: 'Doctors visit summary' },
    { name: 'Influenza(Flu)', imageUrl: '/flu.png', description: 'Description for Fever' },
    { name: 'Common Cold', imageUrl: '/cold.png', description: 'Description for Cold' },
    { name: 'Migraine', imageUrl: '/migrainee.png', description: 'Description for Diarrhea' },
    { name: 'Allergic Rhinitis', imageUrl: '/allergic.png', description: 'Description for Cold' },
    { name: 'Eczema', imageUrl: '/eczema.png', description: 'Description for Cold' },
    { name: 'Osteoporosis', imageUrl: '/osteo.png', description: 'Description for Cold' },
  ];

//   1. *Disease: Common Cold*
//    - Precautions: Rest, Stay Hydrated, Good Hygiene

// 2. *Disease: Influenza (Flu)*
//    - Precautions: Flu Vaccine, Avoid Close Contact, Good Hygiene

// 3. *Disease: Hypertension (High Blood Pressure)*
//    - Precautions: Regular Exercise, Healthy Diet, Stress Management

// 4. *Disease: Diabetes (Type 2)*
//    - Precautions: Monitor Blood Sugar, Healthy Eating, Regular Exercise

// 5. *Disease: Asthma*
//    - Precautions: Avoid Triggers, Regular Medication, Breathing Exercises

// 6. *Disease: Gastroenteritis*
//    - Precautions: Stay Hydrated, Rest, Good Hygiene

// 7. *Disease: Migraine*
//    - Precautions: Stress Management, Adequate Sleep, Avoid Trigger Foods

// 8. *Disease: Allergic Rhinitis*
//    - Precautions: Avoid Allergens, Good Hygiene, Regular Medication

// 9. *Disease: Eczema*
//    - Precautions: Moisturize Skin, Avoid Triggers, Stress Management

// 10. *Disease: Osteoporosis*
//     - Precautions: Calcium and Vitamin D Intake, Regular Exercise, Avoid Smoking


  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };

  const checkPatientExists = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/records/patient/${patientId}`);
      if (!response.ok) {
        throw new Error('Patient not found');
      }
      setPatientConnected(true);
      setError('');
    } catch (error) {
      setError('User with given PatientID doesn\'t exist.');
      setPatientConnected(false);
    }
  };

  const handleConnectClick = () => {
    checkPatientExists();
  };

  const handleDisconnect = () => {
    setPatientConnected(false); 
    setPatientId("");
  }

  const handleDiseaseClick = (diseaseName) => {
    if (patientConnected) {
      navigate('/precautions', { state: { disease: diseaseName, patientId: patientId } });
    } else {
      setError('Please connect to a patient first.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isDoctor");
    navigate('/login');
  };

  return (
    <>
        <AppBar position="static">
          <Toolbar>
            <img src="/logo.png" alt="Doctor Logo" className="logo"/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Doctor's Portal
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="doctor-dashboard">

        {!patientConnected && (
          <div className="patient-connect">
            <TextField
              label="Enter Patient ID"
              variant="outlined"
              value={patientId}
              onChange={handlePatientIdChange}
            />
            <Button variant="contained" color="primary" onClick={handleConnectClick}>Connect</Button>
          </div>
        )}

        {patientConnected && (
          <div className="patient-disconnect">
            <Typography><b>Connected to patient {patientId}</b></Typography>
            <Button variant="contained" color="primary" onClick={handleDisconnect}>Disconnect</Button>
          </div>
        )}

        {/* <div className="disease-tiles">
          {diseases.map((disease) => (
            <Card key={disease.name} className="tile" onClick={() => handleDiseaseClick(disease.name)}>
              <CardContent>
                <Typography variant="h5">{disease.name}</Typography>
                <img src={disease.imageUrl} alt={disease.name} className="disease-image"/>
              </CardContent>
            </Card>
          ))}
        </div> */}

          <div className="disease-tiles">
            {diseases.map((disease) => (
              <Card key={disease.name} className="tile" onClick={() => handleDiseaseClick(disease.name)}>
                <CardContent className="card-content">
                  <img src={disease.imageUrl} alt={disease.name} className="disease-image"/>
                  <div className="tile-divider"></div> {/* Divider line */}
                  <Typography variant="h5" className="tile-name">{disease.name}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>



        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          message={error}
          onClose={() => setError('')}
        />
      </div>
      </>
  );
}

export default DoctorDashboard;

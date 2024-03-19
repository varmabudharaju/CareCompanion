// Precautions.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, AppBar, Toolbar } from '@mui/material';
import './Precautions.css';

function Precautions() {
  const location = useLocation();
  const navigate = useNavigate();
  const diseaseName = location.state?.disease;
  const patientId = location.state?.patientId;

  const precautions = [
    { name: 'REST', imageUrl: '/rest.png' },
    { name: 'DIET', imageUrl: '/diet.png' },
    { name: 'EXERCISE', imageUrl: '/exercise.png' },
    { name: 'STAY HYDRATED', imageUrl: '/hydrated.png' },
    { name: 'GOOD HYGEINE', imageUrl: '/hygiene.png' },
    { name: 'MONITORING', imageUrl: '/monitoring.png' },
    { name: 'REGULAR CHECK-UPS', imageUrl: '/checkups.png'},
    { name: 'MEDICATION', imageUrl: '/medication.png' }
  ];

  const handlePrecautionClick = (precautionName) => {
    navigate('/instructions', { state: { disease: diseaseName, precaution: precautionName, patientId: patientId } });
  };

  return (
    <div className="precautions-page">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Precautions for {diseaseName}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <div className="precaution-tiles">
        {precautions.map((precaution) => (
          <Card key={precaution.name} className="tile" onClick={() => handlePrecautionClick(precaution.name)}>
            <CardContent>
              <Typography variant="h5">{precaution.name}</Typography>
              <img src={precaution.imageUrl} alt={precaution.name} className="precautions-image"/>
              <Typography variant="body2">{precaution.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </div> */}
      <div className="precaution-tiles">
        {precautions.map((precaution) => (
          <Card key={precaution.name} className="tile" onClick={() => handlePrecautionClick(precaution.name)}>
            <CardContent className="card-content">
                  <img src={precaution.imageUrl} alt={precaution.name} className="precautions-image"/>
                  <div className="tile-divider"></div> {/* Divider line */}
                  <Typography variant="h5">{precaution.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Precautions;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Typography, Paper, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
// import { teal, grey } from '@mui/material/colors';

// function VisitSummary() {
//   const location = useLocation();
//   const { recordDetails } = location.state || {};

//   if (!recordDetails) {
//     return <div>Loading...</div>;
//   }

//   const summaryPaperStyle = {
//     padding: '20px',
//     margin: '20px',
//     backgroundColor: grey[100]
//   };

//   const diseaseTitleStyle = {
//     marginBottom: '10px',
//     color: teal[800],
//     fontWeight: 'bold'
//   };

//   return (
//     <Paper elevation={3} style={summaryPaperStyle}>
//       <Typography variant="h4" gutterBottom style={{ color: teal[600] }}>Visit Summary</Typography>
//       <Divider style={{ margin: '10px 0' }} />

//       {recordDetails.diagnoses.map((diagnosis, index) => (
//         <Box key={index} mb={2}>
//           <Typography variant="h6" style={diseaseTitleStyle}>
//             Disease: {diagnosis.disease}
//           </Typography>
//           <List>
//             {diagnosis.precautions.map((precaution, precIndex) => (
//               <ListItem key={precIndex}>
//                 <ListItemText 
//                   primary={`Precaution: ${precaution.name}`} 
//                   secondary={precaution.instructions.map(instr => instr.text).join(", ")} 
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       ))}
//     </Paper>
//   );
// }

// export default VisitSummary;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Paper, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { teal, grey } from '@mui/material/colors';
import './VisitSummary.css'; // Make sure to create and import the CSS file for additional styling

function VisitSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recordDetails } = location.state || {};

  const summaryPaperStyle = {
    padding: '20px',
    margin: '20px',
    backgroundColor: grey[100]
  };

  const diseaseTitleStyle = {
    marginBottom: '10px',
    color: teal[800],
    fontWeight: 'bold'
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isDoctor");
    navigate('/login');
  };

  if (!recordDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* AppBar for header */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctor's Instructions
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} style={summaryPaperStyle}>
        <Typography variant="h4" gutterBottom style={{ color: teal[600] }}>Visit Summary</Typography>
        <Divider style={{ margin: '10px 0' }} />

        {recordDetails.diagnoses.map((diagnosis, index) => (
          <Box key={index} mb={2}>
            <Typography variant="h6" style={diseaseTitleStyle}>
              Disease: {diagnosis.disease}
            </Typography>
            <List>
              {diagnosis.precautions.map((precaution, precIndex) => (
                <ListItem key={precIndex}>
                  <ListItemText 
                    primary={`Precaution: ${precaution.name}`} 
                    secondary={precaution.instructions.map(instr => instr.text).join(", ")} 
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Paper>
    </>
  );
}

export default VisitSummary;

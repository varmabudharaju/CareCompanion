import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './PatientDashboard.css';

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchdoc = async (doctorId) => {
    const docres = await fetch(`http://localhost:9000/api/users/doctor/${doctorId}`);
    if (!docres.ok) {
      throw new Error('Network response was not ok');
    }
    const docdata = await docres.json();
    return docdata;
  };

  useEffect(() => {
    const patientId = localStorage.getItem("userId");
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/records/patient/${patientId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const transformedData = await Promise.all(data.map(async (record) => {
          const docdata = await fetchdoc(record.doctorId);
          return {
            doctorName: docdata ? `${docdata.firstName} ${docdata.lastName}` : 'Unknown Doctor',
            time: record.date,
            status: 'Complete',
            recordDetails: record
          };
        }));

        setAppointments(transformedData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  const formatDateAndTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isDoctor");
    navigate('/login');
  };

  const handleRowClick = (appointment) => {
    navigate('/visit-summary', { state: { recordDetails: appointment.recordDetails } });
  };

  return (
    <div className="patient-dashboard">
      <AppBar position="static">
        <Toolbar>
          <img src="/logo.png" alt="Patient Profile" className="profile-pic"/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient's Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper} className="appointments-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Appointment Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index} onClick={() => handleRowClick(appointment)}>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell >{formatDateAndTime(appointment.time)}</TableCell>
                <TableCell>{appointment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PatientDashboard;

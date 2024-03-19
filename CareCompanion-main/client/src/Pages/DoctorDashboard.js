import React from 'react';
import AppointmentsList from './AppointmentsList';
import PatientOverview from './PatientOverview';

const DoctorDashboard = () => {
  return (
    <div>
      <h1>Doctor's Dashboard</h1>
      <AppointmentsList />
      <PatientOverview />
      {/* Add more components as needed */}
    </div>
  );
};

export default DoctorDashboard;

import React from 'react';

const AppointmentsList = () => {
  // Fetch appointments data, e.g., from a backend
  const appointments = [
    { id: 1, patientName: 'John Doe', date: '2023-11-18' },
    { id: 2, patientName: 'Jane Smith', date: '2023-11-20' },
    // Add more appointments
  ];

  return (
    <div>
      <h2>Upcoming Appointments:</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {`${appointment.patientName} - ${appointment.date}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;

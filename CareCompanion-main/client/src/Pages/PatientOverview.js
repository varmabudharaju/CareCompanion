import React from 'react';

const PatientOverview = () => {
  // Fetch patient data, e.g., from a backend
  const patients = [
    { id: 1, name: 'John Doe', condition: 'Example Disease 1' },
    { id: 2, name: 'Jane Smith', condition: 'Example Disease 2' },
    // Add more patients
  ];

  return (
    <div>
      <h2>Patient Overview:</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {`${patient.name} - ${patient.condition}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientOverview;

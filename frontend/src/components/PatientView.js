import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Grid } from '@mui/material';
import axios from 'axios';

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Patient Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Name: {patient.name}</Typography>
            <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
            <Typography>Gender: {patient.gender}</Typography>
            <Typography>Contact: {patient.contactInfo}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PatientView;
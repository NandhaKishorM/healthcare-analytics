package com.healthcare.repository;

import com.healthcare.model.Patient;
import com.healthcare.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Transactional(readOnly = true)
    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + id));
    }

    @Transactional
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Transactional
    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = getPatient(id);
        patient.setName(patientDetails.getName());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setGender(patientDetails.getGender());
        patient.setContactInfo(patientDetails.getContactInfo());
        return patientRepository.save(patient);
    }

    @Transactional
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new EntityNotFoundException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }
}
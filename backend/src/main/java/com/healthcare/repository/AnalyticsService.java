package com.healthcare.repository;

import com.healthcare.model.MedicalRecord;
import com.healthcare.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public Map<String, Long> getDiagnosisDistribution() {
        List<MedicalRecord> records = medicalRecordRepository.findAll();
        return records.stream()
                .filter(record -> record.getDiagnosis() != null)
                .collect(Collectors.groupingBy(
                    MedicalRecord::getDiagnosis,
                    Collectors.counting()
                ));
    }
}
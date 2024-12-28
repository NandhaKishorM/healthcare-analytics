package com.healthcare.controller;

import com.healthcare.repository.PatientService;
import com.healthcare.repository.AnalyticsService;
import com.healthcare.model.Patient;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthcareController {
    private final PatientService patientService;
    private final AnalyticsService analyticsService;
    
    public HealthcareController(PatientService patientService, AnalyticsService analyticsService) {
        this.patientService = patientService;
        this.analyticsService = analyticsService;
    }
    
    @GetMapping("/patients/{id}")
    public Patient getPatient(@PathVariable Long id) {
        return patientService.getPatient(id);
    }
    
    @GetMapping("/analytics/diagnosis-distribution")
    public Map<String, Long> getDiagnosisDistribution() {
        return analyticsService.getDiagnosisDistribution();
    }
}
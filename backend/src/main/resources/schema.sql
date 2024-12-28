DROP TABLE IF EXISTS medical_record;
DROP TABLE IF EXISTS patient;

CREATE TABLE patient (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(50),
    contact_info VARCHAR(255)
);

CREATE TABLE medical_record (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id BIGINT,
    diagnosis VARCHAR(255),
    treatment TEXT,
    record_date DATE,
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);
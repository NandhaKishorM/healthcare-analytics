-- Clear existing data
DELETE FROM medical_record;
DELETE FROM patient;

-- Insert sample patients
INSERT INTO patient (id, name, date_of_birth, gender, contact_info) VALUES
(1, 'John Doe', '1980-06-15', 'Male', 'john.doe@email.com'),
(2, 'Jane Smith', '1992-03-22', 'Female', 'jane.smith@email.com'),
(3, 'Robert Johnson', '1975-11-08', 'Male', 'robert.j@email.com'),
(4, 'Emily Brown', '1988-09-30', 'Female', 'emily.b@email.com'),
(5, 'Michael Wilson', '1965-12-25', 'Male', 'michael.w@email.com'),
(6, 'Sarah Davis', '1995-07-17', 'Female', 'sarah.d@email.com'),
(7, 'James Miller', '1970-04-03', 'Male', 'james.m@email.com'),
(8, 'Lisa Anderson', '1983-01-20', 'Female', 'lisa.a@email.com'),
(9, 'William Taylor', '1990-08-12', 'Male', 'william.t@email.com'),
(10, 'Jennifer Martin', '1978-05-28', 'Female', 'jennifer.m@email.com');

-- Insert sample medical records
INSERT INTO medical_record (id, patient_id, diagnosis, treatment, record_date) VALUES
(1, 1, 'Hypertension', 'Prescribed Lisinopril 10mg daily', '2024-01-15'),
(2, 1, 'Type 2 Diabetes', 'Metformin 500mg twice daily', '2024-01-20'),
(3, 2, 'Migraine', 'Sumatriptan as needed', '2024-01-18'),
(4, 3, 'Asthma', 'Albuterol inhaler', '2024-01-22'),
(5, 4, 'Anxiety', 'CBT and Sertraline 50mg daily', '2024-01-19'),
(6, 5, 'Arthritis', 'Ibuprofen and physical therapy', '2024-01-21'),
(7, 6, 'Depression', 'Fluoxetine 20mg daily and counseling', '2024-01-23'),
(8, 7, 'GERD', 'Omeprazole 20mg daily', '2024-01-24'),
(9, 8, 'Hypothyroidism', 'Levothyroxine 75mcg daily', '2024-01-25'),
(10, 9, 'High Cholesterol', 'Atorvastatin 40mg daily', '2024-01-26'),
(11, 10, 'Osteoporosis', 'Calcium supplements and exercise', '2024-01-27'),
(12, 1, 'Common Cold', 'Rest and fluids', '2024-01-28'),
(13, 2, 'Bronchitis', 'Antibiotics prescribed', '2024-01-29'),
(14, 3, 'Sinusitis', 'Nasal decongestants', '2024-01-30'),
(15, 4, 'Insomnia', 'Sleep hygiene counseling', '2024-01-31');
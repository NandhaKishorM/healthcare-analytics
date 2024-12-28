# Healthcare Analytics System

## Overview
A comprehensive healthcare analytics platform built with Spring Boot and React, providing real-time insights into patient data and medical records through an interactive dashboard.

## Features
- Real-time analytics dashboard
- Patient data management
- Medical record tracking
- Interactive data visualization
- Dark theme interface

## Tech Stack
- Backend: Spring Boot 2.7.0, MySQL 8.0
- Frontend: React, Material-UI
- Tools: Maven, Yarn

## Prerequisites
- Java 11
- Node.js 18+
- MySQL 8.0
- Maven
- Yarn

## Installation

### Backend Setup
```bash
# Clone repository
git clone https://github.com/yourusername/healthcare-analytics.git

# Navigate to backend directory
cd healthcare-analytics/backend

# Install dependencies
mvn clean install

# Run application
mvn spring-boot:run
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
yarn install

# Start application
yarn start
```

### Database Setup
```sql
CREATE DATABASE healthcare_analytics;
CREATE USER 'healthcare_user'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON healthcare_analytics.* TO 'healthcare_user'@'localhost';
```

## Configuration
Update `application.properties` in backend:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/healthcare_analytics
spring.datasource.username=healthcare_user
spring.datasource.password=yourpassword
```

## Usage
- Access the dashboard at http://localhost:3000
- Backend API available at http://localhost:8080

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request



## Acknowledgments
- Spring Boot team for the excellent framework
- React team for the frontend framework
- Material-UI team for the component library
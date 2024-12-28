// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Box,
  Card,
  CardContent,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import {
  PersonOutline,
  LocalHospital,
  TrendingUp,
  Assessment
} from '@mui/icons-material';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9'
    },
    secondary: {
      main: '#f48fb1'
    },
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d'
    }
  }
});

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalRecords: 0,
    uniqueDiagnoses: 0,
    mostCommonDiagnosis: '',
    recentDiagnoses: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch medical records
        const response = await axios.get('http://localhost:8080/api/analytics/diagnosis-distribution');
        
        // Transform data for charts
        const chartData = Object.entries(response.data).map(([diagnosis, count]) => ({
          diagnosis,
          count
        }));

        setDiagnosisData(chartData);

        // Calculate stats
        setStats({
          totalRecords: chartData.reduce((sum, item) => sum + item.count, 0),
          uniqueDiagnoses: chartData.length,
          mostCommonDiagnosis: chartData.sort((a, b) => b.count - a.count)[0]?.diagnosis || '',
          recentDiagnoses: chartData.length
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <IconButton sx={{ backgroundColor: color, color: 'white' }}>
            {icon}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
          Healthcare Analytics Dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Records"
              value={stats.totalRecords}
              icon={<PersonOutline />}
              color="#1e88e5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Unique Diagnoses"
              value={stats.uniqueDiagnoses}
              icon={<LocalHospital />}
              color="#43a047"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Most Common"
              value={stats.mostCommonDiagnosis}
              icon={<TrendingUp />}
              color="#fb8c00"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Recent Diagnoses"
              value={stats.recentDiagnoses}
              icon={<Assessment />}
              color="#e53935"
            />
          </Grid>
        </Grid>

        {/* Diagnosis Distribution Chart */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Diagnosis Distribution
              </Typography>
              <BarChart
                width={800}
                height={300}
                data={diagnosisData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="diagnosis" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Diagnosis Breakdown
              </Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={diagnosisData}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
        </Grid>

        {/* Diagnosis Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Diagnosis Records
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={diagnosisData.map((item, index) => ({
                    id: index + 1,
                    diagnosis: item.diagnosis,
                    count: item.count
                  }))}
                  columns={[
                    { field: 'diagnosis', headerName: 'Diagnosis', flex: 1 },
                    { field: 'count', headerName: 'Count', flex: 1 }
                  ]}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  sx={{
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
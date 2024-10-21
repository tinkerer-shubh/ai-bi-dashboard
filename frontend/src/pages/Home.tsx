import React, { useState, useEffect } from 'react';
//@ts-ignore
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import api from '../services/api';
import Chart from '../components/Chart';

interface DashboardData {
  name: string;
  layout: {
    salesData: Array<{ name: string; value: number }>;
  };
}

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get(`/dashboard/${id}`);
      setDashboardData(res.data);
    };
    fetchDashboard();
  }, [id]);

  useEffect(() => {
    const fetchPrediction = async () => {
      const res = await api.get(`/dashboard/${id}/predict`);
      setPrediction(res.data.prediction);
    };
    fetchPrediction();
  }, [id]);

  if (!dashboardData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {dashboardData.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Chart data={dashboardData.layout.salesData} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Sales Prediction: {prediction !== null ? prediction.toFixed(2) : 'Calculating...'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
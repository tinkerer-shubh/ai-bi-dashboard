import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import api from '../services/api';

interface Dashboard {
  _id: string;
  name: string;
}

const DashboardList: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  useEffect(() => {
    const fetchDashboards = async () => {
      const res = await api.get('/dashboard');
      setDashboards(res.data);
    };
    fetchDashboards();
  }, []);

  return (
    <List>
      {dashboards.map((dashboard) => (
        <ListItem key={dashboard._id}>
          <ListItemText primary={dashboard.name} />
          <Button href={`/dashboard/${dashboard._id}`}>View</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DashboardList;
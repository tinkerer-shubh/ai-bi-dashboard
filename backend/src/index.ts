import express from 'express';
import dashboardRoutes from './routes/dashboard'; // Import the dashboard router

const app = express();

// Middleware setup
app.use(express.json());

// Use the dashboard routes
app.use('/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

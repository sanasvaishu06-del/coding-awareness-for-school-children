const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Coding Awareness for School Children - CEP Project',
    author: 'Vaishnavi',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`🚀 CEP Coding Awareness Server is running!`);
  console.log(`🌐 Local Website:   http://localhost:${PORT}`);
  console.log(`📡 API Endpoints:   http://localhost:${PORT}/api/health`);
  console.log(`📂 Frontend Static: ${frontendPath}`);
  console.log('========================================================');
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env before using any keys
dotenv.config();
console.log(`[Startup] Environment loaded. GEMINI_API_KEY present: ${!!process.env.GEMINI_API_KEY}`);

const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/history');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`NexusAI Server running on port ${PORT}`);
});

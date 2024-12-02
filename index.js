const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const metricsMiddleware = require('./middleware/metrics');
const authMiddleware = require('./middleware/auth');
const { COINCAP_API_URL, PORT } = require('./config/config');

// Initialize app and logger
const app = express();
app.use(express.json());  // Middleware to parse JSON request bodies
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Middleware for metrics and logging
app.use(metricsMiddleware);

// Endpoint to get exchange rates
app.get('/exchange-rates', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`${COINCAP_API_URL}/assets`);
    const data = response.data.data;

    logger.info('Fetched exchange rates successfully');

    res.json({
      status: 'success',
      data
    });
  } catch (error) {
    logger.error('Error fetching exchange rates', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to generate JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // TODO query an auth service
  if (username == "admin") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    logger.info('Generated JWT token for user: ' + username);
    return res.json({ token });
  } else {
    logger.warn('Failed login attempt for username: ' + username);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

'use strict';

// Load config
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, 'config/configuration.env') });
dotenv.config({ path: path.resolve(__dirname, 'config/app.secrets') });

// Create express app
const express = require('express');
const app = express();

// Create logger
const morganMiddleware = require('./middlewares/morgan.middleware');
const logger = require('./helpers/logger');
app.use(morganMiddleware);

// Main middlewares
app.use(express.json());

// Routers
const login_router = require('./routers/login.router');
app.use('/api', login_router);

const user_router = require('./routers/user.router');
app.use('/api', user_router);

// Optional if you need a front
app.use(express.static('src/public'));

app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('main.pug', {
    message: 'Basic Express is working!',
    fruits: ['Ulpiano', 'Carrasco', 'ulcarmar@gmail.com'],
  });
});

// Error handler
app.use((error, req, res, next) => {
  logger.error(`Error: ${error.message}`);

  const status = error.status || 500;

  res.status(status).json({ error: error.message });
});

// Server start
const listener = app.listen(
  process.env.PORT || 3000,
  process.env.HOST || '0.0.0.0',
  () => {
    logger.info('The app is listening on port ' + listener.address().port);
  }
);

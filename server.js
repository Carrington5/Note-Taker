// Required packages and routes
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlroutes');

// PORT settings
const PORT = process.env.PORT || 3001;

// Express settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API and HTML routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Listener function
app.listen(PORT, () => console.log('API server listening on ' + PORT + '.' + ' Please follow http://localhost:' + PORT));
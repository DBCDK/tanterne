#!/usr/bin/env node

/**
 * @file
 * Starts the application.
 */

require('babel-register');
const {app} = require('./app');
app.startServer();

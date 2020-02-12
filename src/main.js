#!/usr/bin/env node

/**
 * @file
 * Starts the application.
 */

require('@babel/register');
const {createApp} = require('./app');

const app = createApp(false);
const proApp = createApp(true);

app.startServer();
proApp.startServer();

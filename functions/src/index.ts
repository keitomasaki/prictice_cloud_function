/* eslint-disable */
import * as functions from 'firebase-functions';
import express from 'express';
import facilities from './facilities';
import reservations from './reservations';

const app = express();

app.use('/api/facilities', facilities);
app.use('/api/reservations', reservations);

export const fn = functions.https.onRequest(app);

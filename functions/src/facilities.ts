import express from 'express';
import { Firestore } from '@google-cloud/firestore';
import { IFacility } from './models/IFacility';

const firestore = new Firestore();
const getCollection = () => firestore.collection('facilities');

const app = express();

app.get('/', async (req, res) => {
  const snapshot = await getCollection().get();
  const facilities = snapshot.docs.map((doc) => {
    const data = doc.data() as IFacility;
    data.id = doc.id;
    return data;
  });
  res.json(facilities);
});

export default app;

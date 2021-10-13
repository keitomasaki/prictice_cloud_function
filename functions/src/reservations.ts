/* eslint-disable */
import express from 'express';
import { DocumentReference, Firestore } from '@google-cloud/firestore';
import { IReservation } from './models/IReservation';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import { ISystem } from './models/ISystem';

dayjs.extend(tz);
dayjs.tz.setDefault('Asia/Tokyo');

const firestore = new Firestore();
const getCollection = () => firestore.collection('reservations');

const app = express();

app.get('/', async (req, res) => {
  const dataString = req.query.data as string;
  console.log(dataString);
  const data = dayjs(dataString);
  if (!data.isValid()) {
    res.status(400).json({ message: 'dataが必要です' });
    return null;
  }
  const begin = data.startOf('day');
  const end = data.add(1, 'day').startOf('day');

  const snapshot = await getCollection()
    .where('startDate', '>=', begin.toDate())
    .where('startDate', '<=', end.toDate())
    .get();

  const reservations = snapshot.docs.map((doc) => {
    const data = doc.data() as IReservation;
    data.id = doc.id;
    return data;
  });
  res.json(reservations);
  return;
});

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  const docRef = getCollection().doc(id);
  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    res.status(404).send();
    return;
  }
  const data = snapshot.data() as IReservation;
  data.id = docRef.id;
  res.json(data);
});

// 日付型は JSON にないので、文字列で受け取り変換する必要がある。
// これは、リクエストで受け取る 予約 JSON の型を定義している。
type RequestReservation = Omit<IReservation, 'startDate' | 'endDate'> & {
  startDate: string;
  endDate: string;
};

// DB に入っている型と、モデルの型には差異がある。
// これは、DBに入っている型を定義している。
type DbReservation = Omit<IReservation, 'facilityId' | 'startDate' | 'endDate'> & {
  facilityId: DocumentReference;
  startDate: Date;
  endDate: Date;
};

// リクエストのJSONを DB の型に変換する
const convertToDbType = (reqBody: RequestReservation): DbReservation => {
  const facility = firestore.doc('facilities/' + reqBody.facilityId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (reqBody as any).id;
  return {
    ...reqBody,
    facilityId: facility,
    startDate: new Date(reqBody.startDate),
    endDate: new Date(reqBody.endDate),
  };
};

app.post('/', async (req, res) => {
  const data = convertToDbType(req.body);
  const now = new Date();
  const addData = {
    ...data,
    system: {
      createDate: now,
      createUser: {
        displayName: '',
        email: '',
        face: '',
      },
      lastUpdate: now,
      lastUpdateUser: {
        displayName: '',
        email: '',
        face: '',
      },
    } as ISystem,
  };
  const docRef = await getCollection().add(addData);
  const snapshot = await docRef.get();
  res.json({ id: snapshot.id });
});

app.put('/:id', async (req, res) => {
  const id;
});

export default app;

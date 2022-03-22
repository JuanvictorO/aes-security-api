import 'dotenv/config';
import 'reflect-metadata';
import './container';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Security Server is running on port ${process.env.SERVER_PORT}`);
});

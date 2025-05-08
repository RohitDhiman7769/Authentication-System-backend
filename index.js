import express from 'express'
import database from './src/config/database.js'
import dotenv from 'dotenv'
import cors from 'cors';
import router from './src/routes/userRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);

database.connect((err) => {
  if (err) {
    return;
  }
  console.log('Connected to the database');
  app.listen(3000, () => {
    console.log('The sever is running on PORT 3000')
})
});


import express from 'express';
import database from './src/config/database.js';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import router from './src/routes/userRoutes.js';
import { fileURLToPath } from 'url';
import session from 'express-session';
dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(session({
  secret: '123456789',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'pages'));

app.use('/', router);



// ✅ DATABASE CONNECTION
database.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected to the database');
  app.listen(3000, () => {
    console.log('The server is running on PORT 3000');
  });
});

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; //mongo db library
import cors from 'cors'; //Cors will let us accept cross origin request from our frontend to backend.
import dotenv from 'dotenv'; //for keep secret and non shareable properies
import multer from 'multer'; //Multer is a middleware that will let us handle multipart/form data sent from our frontend form.
import morgan from 'morgan'; //used to log information of each request that server receives.
import userRoutes from './routes/userRoutes.js';
import presentationSheduleRoute from './routes/project-member/presentationSheduleRoute.js';

const app = express();

//api configuration
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(morgan("common"));
app.use(cors());
dotenv.config();

// const userRoute = require('./routes/user.js')
// app.use('/user', userRoute)

//middlewares
app.use('/api', userRoutes);
app.use('/presentation-shedule', presentationSheduleRoute);

//mongo setup
const PORT = process.env.PORT || 5000; // use 5000 as default port if PORT is not defined in .env
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

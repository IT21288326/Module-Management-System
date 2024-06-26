import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; // MongoDB library
import cors from 'cors'; // Cors will let us accept cross-origin requests from our frontend to backend.
import dotenv from 'dotenv'; // For keeping secret and non-shareable properties
import multer from 'multer'; // Multer is middleware that handles multipart/form data sent from our frontend form.
import morgan from 'morgan'; // Used to log information of each request that the server receives.
import userRoutes from './routes/userRoutes.js';
import otp from './routes/otpRoutes.js';
import studentReportRouter from './routes/supervisor/studentReportRouter.js'
import formRoutes  from './routes/supervisor/formRoutes.js'
import authentication from './routes/authenticationRouter.js'
import PresentationRoutes from './routes/examiner/PresentationRoutes.js'
import presentationPannelRoute from './routes/project-member/presentationPannelRoute.js';
import { getAllPannelNames } from './controllers/project-member/presentationPannelController.js'
import getGrpRegistrationNumberRoute from './routes/student/getGrpRegistrationNumbersRoute.js'
import presentationSheduleRoute from './routes/project-member/presentationSheduleRoute.js';
import grpRegReoute from "./routes/student/grpRegistrationRoute.js"
import markingRubricsRoute from './routes/project-member/markingRubricsRoute.js'
import emailRoutes from './routes/emailRoutes.js'
//import MarkingRouter from './routes/supervisor/marksRoutes.js'
import markingRubricRoutes from './routes/supervisor/MarkingRubrics.js'
import groupRegistrationRoutes from './routes/supervisor/GroupRegistration.js'
import markingRoutes from './routes/supervisor/SaveMarking.js';
import publicationRoutes  from './routes/student/publishRoutes.js'
import assesmentRoute from './routes/project-member/assesmnetRoute.js'



const app = express();
const forms = multer();



// API configuration
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(forms.array());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('common'));
app.use(cors());
dotenv.config();

//middlewares
const server = http.createServer(app);
app.use('/api', userRoutes);


app.use('/api/GrpRegistration',grpRegReoute );
app.use('/publications', publicationRoutes);











app.use('/studentReportid', studentReportRouter);
app.use('/submitform', formRoutes);
app.use('/submitPresentation', PresentationRoutes);



//Rusith routes

app.use('/presentation-shedule', presentationSheduleRoute);
app.use('/presentation-pannel', presentationPannelRoute);
app.use('/groupNumbers', getGrpRegistrationNumberRoute);
app.get('/pannel-Ids', getAllPannelNames);//getPannelNames Route
app.use('/markingRubrics', markingRubricsRoute);
app.use('/assesment', assesmentRoute);


app.use('/otp', otp);
app.use('/login', authentication);
app.use('/api/emails', emailRoutes);
//app.use('/marksheet', MarkingRouter)


app.use('/api/marking-rubrics', markingRubricRoutes);
app.use('/api/group', groupRegistrationRoutes);
app.use('/api/marking', markingRoutes);


// MongoDB setup
const PORT = process.env.PORT;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

    });
  })
  .catch((err) => {

    console.error('Error connecting to MongoDB:', err);

  });

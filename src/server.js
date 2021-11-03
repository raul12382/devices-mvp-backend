import express, { urlencoded, json } from 'express'
import cors from 'cors'

const app = express();

// Importing Routes
import IndexRoutes from './routes/index'
import MvpRoutes from './routes/dispositivo'

// settings
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))
app.set('port', process.env.PORT || 4000);

// Middlewares
//app.use(urlencoded({ extended: true }));
app.use(express.json({limit:'50mb'}))

// Routes
app.use(cors())
app.use(IndexRoutes);
app.use('/mvp', MvpRoutes);

export default app;
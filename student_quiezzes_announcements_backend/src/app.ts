import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middleware/errorHandler';
import anouncmentsRoutes from "./routes/annoucmentsRoute";
import authRoutes from "./routes/auth";
import quizesRoutes from "./routes/quizeRoute";
import swaggerDocument from "./swagger-output.json";
const app: Application = express();

app.use(cors())
app.use(helmet())


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "too many request from this ip,please try again later"
})

app.use('/api', limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV);
  app.use(morgan('dev'));
}
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Announcement & Quiz API',
    version: '1.0.0',
    endpoints: {
      announcements: '/api/announcements',
      quizzes: '/api/quizzes'
    }
  })
})

app.use("/api/auth", authRoutes);
app.use('/api/announcments', anouncmentsRoutes);
app.use('/api/quizzes', quizesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);



export default app;

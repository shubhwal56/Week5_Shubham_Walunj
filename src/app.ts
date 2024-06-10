import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import projectRoutes from './routes/projectRoutes';
import { sequelize } from './postresDB/pgConfig';
import { initDB } from './postresDB/pgService';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', projectRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

    await initDB(); 

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

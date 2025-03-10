// Import necessary modules
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import winston from 'winston';
import { orderRouter, cartRouter, authRouter, userRouter, articleRouter, shopRouter, storeRouter, utileRouter, paymentRouter, categoriesRouter, usersRouter, ordersRouter, permissionsRouter, rolesRouter, subcategoriesRouter, dashboardRouter } from './src/routes';
import { CustomError } from './src/utils/customError';
import config from './src/config/config';
import db from './src/models';
import multer, { FileFilterCallback } from 'multer';
import path from 'node:path';


import { CustomRequest } from 'interfaces/types/middlewares/request.middleware.types';
import { storeMiddleWear } from './src/middlewares/store.middleweare';
import { shopMiddleWare } from './src/middlewares/shop.middleware';




// Set up Winston for logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
// Create an Express application
const app: Express = express();
app.use('/compressed', express.static(path.join(__dirname, 'compressed')));



// Increase the request body size limit for URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000']; // Add more origins as needed
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } })); // HTTP logging


// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per 15 minutes
});
app.use(limiter);







// Routes

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('SERVER');
  next();
});
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/articles', articleRouter);



// Error handling middleware
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(error); // Log the error
  res.status(error.statusCode || 500).json({
    error: {
      message: error.message,
      code: error.code,
      data: error.data,
    }
  });
});

// Set up the server
const PORT = process.env.PORT || config.port;
app.listen(Number(PORT), () => {
  // seedDatabase()
  logger.info(`Server is running on port ${PORT} in ${app.get('env')} mode`);

});


// Sync the database
if (process.env.NODE_ENV !== 'production') {
  db.sequelize.sync().then(() => {
    logger.info('Database synced');
    // seedDatabase()
  }).catch((err: Error) => {
    logger.error('Error syncing database:', err);
  });
}
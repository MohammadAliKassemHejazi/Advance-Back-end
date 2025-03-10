import { Request } from 'express';

// Define an interface that extends the existing Request interface
export interface CustomRequest extends Request {
  UserId?: string; // Add UserId property, make it optional if it's not always set
   rawBody?: Buffer;
}
import { Router, Request, Response, NextFunction } from 'express';
import { pathToRegexp } from 'path-to-regexp'; // Assuming you've installed path-to-regexp
import { verifyToken } from "./auth.middleware"; // Import your authentication middleware
import { Key } from 'path-to-regexp';


export const protectedRoutes = (router: Router, routesToProtect: string[]): void => {
  router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestPath = req.path;

      // Use a regular expression to match protected routes with dynamic segments
      const isProtected = routesToProtect.some((pattern) => {
        const keys: Key[] = []; 
        const regex = pathToRegexp(pattern, keys);
        return regex.test(requestPath);
      });

      if (isProtected) {
        await verifyToken(req); // Perform token validation for protected routes
      }

      next();
    } catch (error) {
      next(error);
    }
  });
};
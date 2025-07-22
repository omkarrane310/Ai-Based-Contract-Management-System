import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser; // Assuming req.user is set after authentication
    if (user && user.email === process.env.ADMIN_EMAIL) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
import { Request, Response } from "express";
import test from "node:test";
import Restaurant from "../models/restaurant";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.find({ user: req.userId });
    return res.status(409).json({ message: "User restaurant already exist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

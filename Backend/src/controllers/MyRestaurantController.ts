import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching restaurant data" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // Check for userId and file at the start
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    console.log("Incoming Request Body:", req.body);

    // Check if the restaurant already exists
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }
    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    // Upload image to Cloudinary
    // Create the restaurant entry
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    console.log("User ID:", req.userId); // Check what this logs

    restaurant.user = new mongoose.Types.ObjectId(req.userId as string);
    restaurant.lastUpdated = new Date();

    // Save the restaurant
    const savedRestaurant = await restaurant.save();
    console.log("Saved Restaurant:", savedRestaurant);

    // Respond with the created restaurant
    return res.status(201).send(savedRestaurant);
  } catch (error) {
    // Log any errors
    console.log("Error in createMyRestaurant:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("Error in updating restaurant ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};

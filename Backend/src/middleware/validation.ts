import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a String"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be a String"),
  body("country").isString().notEmpty().withMessage("Country must be a String"),
  body("city").isString().notEmpty().withMessage("city must be a String"),
  handleValidationErrors,
];
export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
  body("city").notEmpty().withMessage("city is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array must be non empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu Items name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Items price is required and must be a positive integer"),
  handleValidationErrors,
];

import jwt from "jsonwebtoken";

// func to generate a token for a user

export const generateToken = (userId) => {
   if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined");
   }
   const token = jwt.sign({ userId }, process.env.JWT_SECRET);
   return token;
}
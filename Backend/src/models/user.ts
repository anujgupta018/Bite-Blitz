import mongoose from "mongoose";

// interface IUser extends Document {
//   auth0Id: string;
//   email: string;
//   name?: string;
//   addressLine1?: string;
//   city?: string;
//   country?: string;
// }
const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
export default User;

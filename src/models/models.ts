import mongoose from "mongoose";
import {UserModel} from "./user.model";

const connectDb = () => {
  let base = process.env.MONGODB_BASE;
  if (process.env.NODE_ENV === "testing") {
    base = `${base}_test`;
  }
  return mongoose.connect(`${process.env.MONGODB_URL}/${base}`,
                          { useNewUrlParser: true });
};
const models = { UserModel };

export { connectDb };
export default models;

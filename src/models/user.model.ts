import { model, Schema } from "mongoose";

export interface User {
    accessToken?: string;
    name: string;
}

const userSchema = new Schema({
    accessToken: {
        type: String,
        unique: true
    },
    name: {
        required: true,
        type: String,
        unique: true
    },
});

export const UserModel = model("User", userSchema);

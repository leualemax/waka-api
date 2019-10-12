import crypto from "crypto";
import * as express from "express";
import models from "../models/models";

export default class AuthController {
    public path = "/auth";
    public router = express.Router();

    constructor() {
        this.router.get(`${this.path}/signin/:accessToken`, this.signin);
        this.router.get(`${this.path}/signup/:name`, this.signup);
    }

    private async signin(request: express.Request, response: express.Response) {
        const query = models.UserModel.findOne({accessToken: request.params.accessToken});
        const user = await query.exec();
        if (user) {
            response.json({data: user});
        } else {
            response.status(404).json({msg: "User not found"});
        }
    }

    private async signup(request: express.Request, response: express.Response) {
        const user = new models.UserModel({
            accessToken: crypto.randomBytes(64).toString("hex"),
            name: request.params.name
        });
        try {
            await user.save();
            return response.status(200).json({data: user});
        } catch (err) {
            return response.status(409).json({msg: "User already exists"});
        }
    }
}

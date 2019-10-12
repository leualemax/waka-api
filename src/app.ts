import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectDb } from "./models/models";

class Server {
    public app: express.Application;
    public corsOptions = {
        optionsSuccessStatus: 200,
        origin: "*"
    };

    constructor(public controllers: any, public port: string) {
        this.app = express();
        this.setCors();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen() {
        connectDb().then(async () => {
            this.app.listen(this.port, () => {
                console.log(`App listening on the port ${this.port}`);
            });
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private setCors() {
        const c = cors(this.corsOptions);
        this.app.options("*", c);
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use("/api/v1/", controller.router);
        });
    }
}

export default Server;

import Server from "./app";
import AuthController from "./controllers/auth.controller";

export const server = new Server(
  [
    new AuthController(),
  ],
  process.env.PORT,
);

server.listen();

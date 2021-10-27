import { Router } from "express";
import { authenticateUserController } from "./controllers/authenticateUserController";
import { createdMessageController } from "./controllers/createdMessageController";
import { ensureAuthenticate } from "../src/middleware/ensureAuthenticate";

const router = Router();

router.post("/authenticate", new authenticateUserController().handle);

router.post("/messages", ensureAuthenticate, new createdMessageController().handle);

export { router }
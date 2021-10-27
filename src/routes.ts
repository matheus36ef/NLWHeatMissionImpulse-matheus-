import { Router } from "express";
import { authenticateUserController } from "./controllers/authenticateUserController";
import { createdMessageController } from "./controllers/createdMessageController";
import { ensureAuthenticate } from "../src/middleware/ensureAuthenticate";
import { GetLast3MessagesControler } from "./controllers/GetLast3MessageControllers";

const router = Router();

router.post("/authenticate", new authenticateUserController().handle);

router.post("/messages", ensureAuthenticate, new createdMessageController().handle);

router.get("/messages/lest3", new GetLast3MessagesControler().handle);

export { router }
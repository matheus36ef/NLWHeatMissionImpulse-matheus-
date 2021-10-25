import { Router } from "express";
import { authenticateUserController } from "./controllers/authenticateUserController";

const router = Router();

router.post("/authenticate", new authenticateUserController().handle);


export { router }
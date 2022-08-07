import { Router } from "express";
import { asyncwrap } from "../utils/async-wrap";
import { createUser } from "./create-user";

const router = Router();

router.post("/users", asyncwrap(createUser));

export const userRouter = router;
import { Router } from "express";
import { asyncwrap } from "../utils/async-wrap";
import { createUser } from "./user-create";

const router = Router();

router.get("/users/:id", asyncwrap(createUser))

export const userRouter = router;
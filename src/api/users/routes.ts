import { Router } from "express";
import { asyncwrap } from "../utils/async-wrap";
import { createUserHAndler } from "./create-user";

const router = Router();

router.post("/users", asyncwrap(createUserHAndler));

export const userRouter = router;
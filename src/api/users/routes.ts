import { Router } from "express";
import { setAuthenticatedUser } from "../middleware/set-authenticated-user";
import { asyncwrap } from "../utils/async-wrap";
import { createUserHAndler } from "./create-user";

const router = Router();

router.post("/users", asyncwrap(createUserHAndler));
router.put("/users/:id", asyncwrap(setAuthenticatedUser), asyncwrap(createUserHAndler));

export const userRouter = router;
import { Router } from "express";
import { asyncwrap } from "../utils/async-wrap";
import { createEventHandler } from "./create-event";

const router = Router();

router.post("/analytics-events", asyncwrap(createEventHandler));

export const analyticsRouter = router;
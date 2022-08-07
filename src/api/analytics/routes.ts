import { Router } from "express";
import { asyncwrap } from "../utils/async-wrap";
import { createAnalyticsEvent } from "./create-analytics-event";

const router = Router();

router.post("/analytics-events", asyncwrap(createAnalyticsEvent));

export const analyticsRouter = router;
import { ExceptionEvent } from "@prisma/client";
import { prismaClient } from "../clients/prisma";
import { z } from "zod";
import { Request, Response } from "express";

type ExceptionEventCreationParams = Omit<ExceptionEvent, "id">

enum EventType {
  EXCEPTION = "exception"
}

const createEventHandlerBodySchema = z.object({
  type: z.nativeEnum(EventType),
  displayName: z.string(),
  createdAt: z.preprocess((createdAt) => new Date(z.string().parse(createdAt)), z.date()).transform(createdAt=> new Date(createdAt)),
  content: z.string(),
  metadata: z.record(z.string()).optional(),
  identifiers: z.record(z.string()).optional(),
})

type CreateEventHandlerBody = z.infer<typeof createEventHandlerBodySchema>

export async function createEventHandler(req: Request, res: Response) {
  const requestBody = createEventHandlerBodySchema.parse(req.body);

  if (requestBody.type === EventType.EXCEPTION) {
    await createExceptionEvent(requestBody)
  }
}

export async function createExceptionEvent(exceptionEventCreationParams: ExceptionEventCreationParams) {
  const exceptionEvent = await prismaClient.exceptionEvent.create({
    data: exceptionEventCreationParams
  })
}
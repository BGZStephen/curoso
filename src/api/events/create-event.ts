import { ExceptionEvent } from "@prisma/client";
import { prismaClient } from "../clients/prisma";
import { z } from "zod";
import { Request, Response } from "express";
import Context from "../middleware/context";
import { HttpError } from "../errors/http-error";

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

  const ctx = Context.get(req);

  if (!ctx || !ctx.organisation) {
    throw new HttpError("Unauthorized", 403)
  }

  if (requestBody.type === EventType.EXCEPTION) {
    const exceptionEventCreationParams = hydrateEventFromRequestBody(requestBody, ctx.organisation.id)

    const exceptionEvent = await prismaClient.exceptionEvent.create({
      data: exceptionEventCreationParams
    })

    return exceptionEvent
  }
}

export function hydrateEventFromRequestBody(body: CreateEventHandlerBody, organisationId: string): ExceptionEventCreationParams {
  const { displayName, createdAt, content, metadata, identifiers } = body;

  return {
    displayName,
    createdAt,
    content,
    metadata: JSON.stringify(metadata),
    identifiers: JSON.stringify(identifiers),
    organisationId
  }
}
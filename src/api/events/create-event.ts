import { Event, EventType } from "@prisma/client";
import { prismaClient } from "../clients/prisma";
import { z } from "zod";
import { Request, Response } from "express";
import { Context } from "../middleware/context";
import { UnauthorizedError } from "../errors/http-error";

export type EventCreationParams = Omit<Event, "id">

const createEventHandlerBodySchema = z.object({
  type: z.nativeEnum(EventType),
  displayName: z.string(),
  createdAt: z.preprocess((createdAt) => new Date(z.string().parse(createdAt)), z.date()).transform(createdAt=> new Date(createdAt)),
  content: z.string(),
  metadata: z.record(z.string()).optional(),
  identifiers: z.record(z.string()).optional(),
})

export type CreateEventHandlerBody = z.infer<typeof createEventHandlerBodySchema>

export async function createEventHandler(req: Request, res: Response) {
  const requestBody = createEventHandlerBodySchema.parse(req.body);

  const ctx = Context.get(req);

  if (!ctx || !ctx.organisation) {
    throw new UnauthorizedError()
  }

  if (requestBody.type === EventType.EXCEPTION) {
    const exceptionEventCreationParams = hydrateEventFromRequestBody(requestBody, ctx.organisation.id)

    await prismaClient.event.create({
      data: exceptionEventCreationParams
    })
  }

  res.sendStatus(200)
}

export function hydrateEventFromRequestBody(body: CreateEventHandlerBody, organisationId: string): EventCreationParams {
  const { type, displayName, createdAt, content, metadata, identifiers } = body;

  return {
    type,
    displayName,
    createdAt,
    content,
    metadata: JSON.stringify(metadata),
    identifiers: JSON.stringify(identifiers),
    organisationId
  }
}
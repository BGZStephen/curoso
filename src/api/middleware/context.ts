import { Organisation, User } from '@prisma/client';
import { Request } from 'express';

export class Context {
  static bindings = new WeakMap<Request, Context>();

  public authenticatedser: User | null = null;
  public organisation: Organisation | null = null;
    
  static bind (req: Request) : Context {
    const ctx = new Context();
    Context.bindings.set(req, ctx);
    return ctx;
  }
    
  static get (req: Request) : Context | null {
    return Context.bindings.get(req) || null;
  }
}
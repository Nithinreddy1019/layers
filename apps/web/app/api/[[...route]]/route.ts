import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import auth from "./authentication";

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app  
  .route("/authentication", auth)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)

export type AppType = typeof app;
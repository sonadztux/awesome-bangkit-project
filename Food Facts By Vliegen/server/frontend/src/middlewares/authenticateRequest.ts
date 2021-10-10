import express from 'express'

export default function authenticateRequest(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  next()
}

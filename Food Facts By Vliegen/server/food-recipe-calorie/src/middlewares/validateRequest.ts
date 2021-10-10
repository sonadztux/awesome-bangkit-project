import express from 'express'

import createResponseBody from '../utils/createResponseBody'

export default function validateRequest(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (!err && req?.body && 'image' in req.body) next()

  res.status(400).json(createResponseBody(400, 'Invalid request body.', null))
}

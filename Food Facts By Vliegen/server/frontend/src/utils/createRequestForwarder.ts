import express from 'express'
import axios from 'axios'

export function createRequestForwarder(targetUrl: string) {
  return async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const fwdRes = await axios.post(targetUrl, req.body)
      res.status(fwdRes.status).json(fwdRes.data)
    } catch (error) {
      console.log('ERR | ' + targetUrl + ' | ' + error.message)
      res.status(500).json({
        status: true,
        meta: {
          response_code: 200,
          code: 500,
          severity: 'FRONTEND_ERROR',
          message: 'There is error when processing your request, please try again later.',
        },
      })
    }
  }
}

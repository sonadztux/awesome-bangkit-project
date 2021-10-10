import { RecipeCalorieSummary } from '../db/models'

type ResponseCode = 200 | 400 | 405 | 422 | 500

interface ResponseBody {
  status: boolean
  meta: {
    response_code: ResponseCode
    code: ResponseCode
    severity: 'OK'
    message: string
  }
  result: RecipeCalorieSummary | null
}

export default function createResponseBody(
  code: ResponseCode,
  message: string,
  result: RecipeCalorieSummary | null
): ResponseBody {
  const res: ResponseBody = {
    status: true,
    meta: {
      response_code: code,
      code: code,
      severity: 'OK',
      message: message,
    },
    result: result,
  }
  return res
}

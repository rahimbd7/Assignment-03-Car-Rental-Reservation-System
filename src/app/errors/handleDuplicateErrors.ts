/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../common interfaces/errors'

export const handleDuplicateErrors = (err: any): TGenericErrorResponse => {
  const errorMsg = err?.errmsg

  const extractedMessage = errorMsg.match(/"([^"]*)"/)[1]

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ]
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  }
}

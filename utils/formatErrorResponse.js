import _get from 'lodash/get'
import { formatErrorsForVeeValidate } from './formatErrorsForVeeValidate'

export const formatErrorResponse = (_error) => {
  const error = new Error(_get(_error, 'response.data.message', _error.message))
  error.errors = _get(_error, 'response.data.errors', [])
  error.formErrors = formatErrorsForVeeValidate(error.errors)
  error.status = _get(_error, 'response.status')
  return error
}

export const formatErrorsForVeeValidate = (errors = []) => {
  if (!Array.isArray(errors)) return {}
  return errors.reduce((obj, err) => {
    if (err.field && err.message) {
      obj[err.field] = err.message
    }
    return obj
  }, {})
}

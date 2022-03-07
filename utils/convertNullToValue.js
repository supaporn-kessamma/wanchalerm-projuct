export const convertNullToValue = (obj, expectValue = '') => {
  return Object.entries(obj).reduce((_obj, [key, value]) => {
    if (Array.isArray(value)) {
      _obj[key] = value.map((v) => convertNullToValue(v))
    } else if (typeof value === 'object' && value !== null) {
      _obj[key] = convertNullToValue(value)
    } else if (value === null || value === 'null') {
      _obj[key] = expectValue
    } else {
      _obj[key] = value
    }
    return _obj
  }, {})
}

import qs from 'qs'

export const queryStringStringify = (obj) => {
  return qs.stringify(obj, { encode: false })
}

export const arraygify = (data, noEmpty = false) => {
  const result = Array.isArray(data) ? data : [data]
  return noEmpty ? result.filter(Boolean) : result
}

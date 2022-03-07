import parsePhoneNumber from 'libphonenumber-js'

export const formatPhoneURI = (phone) => {
  if (!phone) return phone
  return parsePhoneNumber(phone, 'TH').getURI()
}

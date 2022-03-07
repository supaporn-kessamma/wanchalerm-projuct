import ApiUtil from '@/utils/api'
import { queryStringStringify } from '@/utils/query-string'
import Api from './Api'

class Auth extends Api {
  static url = '/v2/auth'

  static async register(userData, params) {
    if (!userData) throw new Error('user data is required')
    const query = queryStringStringify(params)
    const resp = await ApiUtil.$axios.$post(
      `/public${this.url}/register?${query}`,
      userData
    )
    return resp
  }
}

export default Auth

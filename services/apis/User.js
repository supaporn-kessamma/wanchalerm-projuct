import Api from './Api'
import ApiUtil from '@/utils/api'
import { queryStringStringify } from '@/helpers/query-string'
class User extends Api {
  static url = '/v1/users'

  static async getAllInUpload(params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$get(`${this.url}/upload?${query}`)

    return response
  }

  static async read(id) {
    const response = await ApiUtil.$axios.$post(`${this.url}/${id}/read`)

    return response
  }

  static async getCount(params = {}) {
    const response = await ApiUtil.$axios.$get(`${this.url}/count`)

    return response
  }
}

export default User

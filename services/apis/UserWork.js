import Api from './Api'
import ApiUtil from '@/utils/api'
class UserWork extends Api {
  static url = '/v1/user-works'

  static async getCount(params = {}) {
    const response = await ApiUtil.$axios.$get(`${this.url}/count`)

    return response
  }
}

export default UserWork

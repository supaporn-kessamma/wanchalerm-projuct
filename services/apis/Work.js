import Api from './Api'
import ApiUtil from '@/utils/api'
import { queryStringStringify } from '@/utils/query-string'

class Work extends Api {
  static url = '/v1/works'

  static async read(payload, params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$post(
      `${this.url}/read?${query}`,
      payload
    )

    return response
  }

  static async approve(id, payload, params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$put(
      `${this.url}/${id}/approve?${query}`,
      payload
    )

    return response
  }

  static async reject(id, payload, params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$put(
      `${this.url}/${id}/reject?${query}`,
      payload
    )

    return response
  }

  static async getCount(params = {}) {
    const response = await ApiUtil.$axios.$get(`${this.url}/count`)

    return response
  }

  static async getTopViews(params = {}) {
    const response = await ApiUtil.$axios.$get(`${this.url}/top-views`)

    return response
  }
}

export default Work

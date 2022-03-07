import ApiUtil from '@/utils/api'
import { queryStringStringify } from '@/helpers/query-string'

class Api {
  static async getAll(params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$get(`${this.url}?${query}`)

    return response
  }

  static async create(payload, params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$post(`${this.url}?${query}`, payload)

    return response
  }

  static async getById(id, params = {}) {
    const query = queryStringStringify(params)

    const { data } = await ApiUtil.$axios.$get(`${this.url}/${id}?${query}`)

    return data
  }

  static async update(id, payload, params = {}) {
    const query = queryStringStringify(params)
    const response = await ApiUtil.$axios.$put(
      `${this.url}/${id}?${query}`,
      payload
    )

    return response
  }

  static async delete(id) {
    await ApiUtil.$axios.$delete(`${this.url}/${id}`)
  }
}

export default Api

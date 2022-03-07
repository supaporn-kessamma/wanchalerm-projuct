import Api from './Api'
import ApiUtil from '@/utils/api'

class Comment extends Api {
  static url = '/v1/comments'

  static async getTopComments() {
    const response = await ApiUtil.$axios.$get(`${this.url}/top-comments`)

    return response
  }
}

export default Comment

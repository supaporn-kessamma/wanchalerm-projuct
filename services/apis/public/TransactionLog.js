import Api from '../Api'
import ApiUtil from '@/utils/api'

class TransactionLog extends Api {
  static url = '/v1/public/transaction-logs'

  static async view() {
    const response = await ApiUtil.$axios.$post(`${this.url}/view`)

    return response
  }
}

export default TransactionLog

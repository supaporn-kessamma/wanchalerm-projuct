import Api from '@/utils/api'

export const accessor = ({ $axios }) => {
  Api.initializeAxios($axios)
}

export default accessor

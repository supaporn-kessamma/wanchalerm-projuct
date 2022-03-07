import banks from '@/configs/banks'
import _get from 'lodash/get'

export const getBankFullName = (shortName) => {
  return _get(
    banks.find((b) => b.value === shortName),
    'label'
  )
}

import { INCR_NUM } from '../mutation-types'

export function increase ({dispatch}) {
  dispatch(INCR_NUM)
}
import { INCR_NUM } from '../mutation-types'

const state = {
  num: 0,
}

const mutations = {
  [INCR_NUM] (state) {
    state.num++
  },
}

export default {
  state,
  mutations,
}
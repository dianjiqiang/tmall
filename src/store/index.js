import { createStore } from 'vuex'

import state from "./state";
import mutations from "./mutations";
import actions from "./actions"

export default createStore({
  state,
  mutations,  //mutations 的唯一目的就是修改state中的数据  而且mutations的设计原则就是完成一些比较单一的操作
  actions,
  modules: {
  }
})

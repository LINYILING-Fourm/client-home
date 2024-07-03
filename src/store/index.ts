// src/store/index.ts
import { createStore, createLogger } from "vuex";
import { IUserState } from './modules/user';




export interface IRootState {
  user: IUserState;
}

const store = createStore<IRootState>({
  state: {
    user: {} as IUserState // 根据需要初始化 user state
  },
  mutations: {




    // 你的 mutations   同步
  },
  actions: {
    // 你的 actions   异步
  },
  modules: {
    // 你的 modules
  }
});

export default store;

/**
 * @name: router
 * @description：router.js
 * @date: 2022/11/1 21:36
 * @author: yf_hu
 */
import {defineStore} from 'pinia'
export const useRouterStore = defineStore({
  id: 'router',
  state: () => ({
    cachedViews:[]
  }),
  getters: {

  },
  actions: {
    addCachedViews: function (view) {
      if (this.cachedViews.includes(view.name)) return
      if (view.meta.isCache) {
        this.cachedViews.push(view.name)
      }
    }
  }
})

import jsCookie from 'js-cookie'
// const cookieParser = require('cookie-parser')

export const state = () => ({
  token: null
})

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  REMOVE_TOKEN (state) {
    state.token = null
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req, route, app, store, redirect }) {
    // 다시 켜기
    // let token

    // if (req) {
    //   if (req.headers.cookie) {
    //     token = req.headers.cookie.split('x-access-token=')[1]

    //     if (token) {
    //       try {
    //         await store.dispatch('setToken', token)
    //       } catch (err) {
    //         await store.dispatch('logout')
    //       }
    //     } else {
    //       await jsCookie.remove('x-access-token')
    //       await store.commit('REMOVE_TOKEN')
    //     }
    //   } else {
    //     redirect('/auth/login')
    //   }
    // }
  },
  async setToken ({ commit, state }, payload) {
    this.$axios.setToken(payload, 'Bearer')
    await jsCookie.set('x-access-token', payload)
    await commit('SET_TOKEN', payload)
  },
  async logout ({ commit }) {
    await this.$axios.setToken(false)
    await jsCookie.remove('x-access-token')
    await commit('REMOVE_TOKEN')
  }
}

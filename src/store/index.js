import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    backendUrl: "https://kaofood.ddns.net/api",
    menus: [],
    categories: [],
    cart: []
  },
  mutations: {
    SET_MENU(state, data) {
      state.menus = data
    },
    SET_Category(state, data) {
      state.categories = data
    }
  },
  actions: {
    fetchMenu({ commit }) {
      axios.get(`${this.state.backendUrl}/menu`)
          .then(response => {
            commit('SET_MENU', response.data)
          })
    },
    fetchCategory({ commit }) {
      axios.get(`${this.state.backendUrl}/category`)
          .then(response => {
            commit('SET_Category', response.data)
          })
    }
  },
  getters:{
    getMenu(state){
      return state.menus;
    }
  },
  modules: {
  }
});
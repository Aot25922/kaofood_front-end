import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
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
      axios.get('https://kaofood.ddns.net/api/menu')
          .then(response => {
            commit('SET_MENU', response.data)
          })
    },
    fetchCategory({ commit }) {
      axios.get('https://kaofood.ddns.net/api/category')
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
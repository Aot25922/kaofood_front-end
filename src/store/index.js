import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    backendUrl: "https://kaofood.ddns.net/api",
    account: null,
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
    },
    SET_CART(state, data) {
      state.cart = data
    },
    SET_ACCOUNT(state, data) {
      state.account = data
    },
    addCartItem(state, item){
      item.count = 1;
      state.cart.push(item);
    },
    updateCartItem(state, item){
      item.count += 1;
      state.cart.map(add => {
        if (add.id == item.id) {
          return item;
        }else return add;
      });
    }
  },
  actions: {
    async fetchAPI({ commit }) {
      await axios.get(`${this.state.backendUrl}/category`)
          .then(response => {
            commit('SET_Category', response.data)
          })
      await axios.get(`${this.state.backendUrl}/menu`)
          .then(response => {
            commit('SET_MENU', response.data)
          })
      console.log("Fetch API");
    },

    fetchLocalStoeage({ commit }) {
      if (localStorage.getItem("account")) {
        try {
          commit('SET_ACCOUNT',JSON.parse(localStorage.getItem("account")));
        } catch (e) {
          localStorage.removeItem("account");
        }
      }

      if(localStorage.getItem("cart")){
        try {
          // bugแดก แก้ข้อมูลที่ load จาก LocalStoeage ไม่ได้
          commit('SET_CART',JSON.parse(localStorage.getItem("cart")));
        } catch (e) {
          localStorage.removeItem("cart");
        }
      }
      console.log("Fetch LocalStoeage");
    },

    addToCart({ commit }, item){
      if(this.state.cart.find(element => (element.id == item.id) ? true : false)){
        commit('updateCartItem',item);
      }else {
        commit('addCartItem', item);
      }
      localStorage.setItem('cart',JSON.stringify(this.state.cart))
    },

    async getAccount({ commit }, loginForm){
      if (loginForm == null){
        commit('SET_ACCOUNT',null);
        return;
      }
      await axios.get(`${this.state.backendUrl}/user/login?email=${loginForm.email}&password=${loginForm.password}`)
        .then(response => {
          commit('SET_ACCOUNT', response.data)
        })
      localStorage.setItem('account',JSON.stringify(this.state.account))
    }
  },
  getters:{},
  modules:{}
});
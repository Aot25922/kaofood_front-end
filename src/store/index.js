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
    },
    SET_CART(state, data) {
      state.cart = data
    },
    addCartItem(state, item){
      if(item.count == null) item.count = 1;
      state.cart.push(item);
    },
    updateCartItem(state, item){
      // bugแดก แก้ข้อมูลที่ load จาก LocalStoeage ไม่ได้
      item.count += 1;
      state.cart.map(add => {
        if (add.id == item.id) {
            console.log('updateCartItem')
          return item;
        }else return add;
      });
    }
  },
  actions: {
    async fetchAPI({ commit }) {
      axios.get(`${this.state.backendUrl}/category`)
          .then(response => {
            commit('SET_Category', response.data)
          })
      axios.get(`${this.state.backendUrl}/menu`)
          .then(response => {
            commit('SET_MENU', response.data)
          })
      console.log("Fetch API");
    },
    fetchLocalStoeage({ commit }) {
      if(localStorage.getItem("cart")){
        try {
          let cart = JSON.parse(localStorage.getItem("cart"));
          for(let data of cart){
              commit('addCartItem',data);
          }
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
    }
  },
  getters:{},
  modules:{}
});
import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    backendUrl: "https://kaofood.works/api",
    // backendUrl: "http://localhost:8080",
    account: null,
    moreInfo: null,
    users: [],
    menus: [],
    categories: [],
    cart: [],
    JWT:null
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
    SET_USER(state, data){
      state.users = data
      console.log(data)
    },
    SET_JWT(state,data) {
      if (data == null || data == '') {
        state.JWT = null
        return
      }
      console.log(data)
      state.JWT=data
    },
    SET_ACCOUNT(state, data) {
      if (data == null || data == '') {
      state.account = null;
      return
    } 
      state.account = data
    },
    SET_INFO(state, data){
      state.moreInfo = data
    },
    addCartItem(state, item){
      item.count = 1;
      state.cart.push(item);
    },
    updateCartItem(state, item){
      state.cart.find(element => (element.id == item.id)).count+=1
      state.cart.map(add => {
        if (add.id == item.id) {
          return item;
        }else return add;
      });
    },
    removeCartItem(state, item) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id != item.id;
      });
    }
  },
  actions: {
    async fetchCategoryAPI({ commit }) {
      await axios.get(`${this.state.backendUrl}/category`)
          .then(response => {
            commit('SET_Category', response.data)
          })
      console.log("Fetch Category");
    },
    async fetchMenuAPI({ commit }) {
      await axios.get(`${this.state.backendUrl}/menu`)
          .then(response => {
            commit('SET_MENU', response.data)
          })
      console.log("Fetch MENU");
    },
    async fetchUserAPI({ commit }) {
      await axios.get(`${this.state.backendUrl}/user`)
          .then(response => {
            commit('SET_USER', response.data)
            console.log(response.data)
          })  
          console.log("Fetch All User");
    },
    menuInfo({ commit }, item) {
      commit('SET_INFO', item);
    },
    async fetchLocalStorage({ commit }) {
        try {
          await axios.get(`${this.state.backendUrl}/user/login`,{withCredentials:true}).then(response => {
            commit('SET_JWT', response.headers.jwt)
            commit('SET_ACCOUNT', response.data)
          })
        } catch (e) {
           console.log(e)
        }
      
      if(localStorage.getItem("cart")){
        try {
          commit('SET_CART',JSON.parse(localStorage.getItem("cart")));
        } catch (e) {
          localStorage.removeItem("cart");
        }
      }
      console.log("Fetch LocalStorage");
    },
    addToCart({ commit }, item){
      if(this.state.cart.find(element => (element.id == item.id) ? true : false)){
        commit('updateCartItem', item);
      }else {
        commit('addCartItem', item);
      }
      localStorage.setItem('cart',JSON.stringify(this.state.cart))
    },
    removeCart({ commit }, item){
      commit('removeCartItem', item);
      localStorage.setItem('cart',JSON.stringify(this.state.cart))
    },
    async getAccount({ commit }, loginForm){
      if (loginForm == null){
        await axios.delete(`${this.state.backendUrl}/user/logout`,{withCredentials:true,headers : {"Authorization": `Bearer ${this.state.JWT}`}})
        commit('SET_ACCOUNT',null);
        localStorage.removeItem("cart");
      }else {
        await axios.get(`${this.state.backendUrl}/user/login?email=${loginForm.email}&password=${loginForm.password}`,{withCredentials:true})
            .then(response => {
              commit('SET_JWT', response.headers.jwt)
              commit('SET_ACCOUNT', response.data)
              console.log(response.data)
            })
      }
    },
    async setNewAccount({ commit }, newAccount){
      let data = new FormData();
      data.append("account",newAccount)
      await axios.post(`${this.state.backendUrl}/user/signup`,data,{withCredentials:true}
      ).then(response => {
        if(response.data == "accountEmailExist"){
          commit('SET_ACCOUNT', "accountEmailExist")
        }
        if(response.data == "accountPhoneExist"){
          commit('SET_ACCOUNT', "accountPhoneExist")
        }
        if(response.data == "success"){
          console.log(response.data)
          commit('SET_ACCOUNT', "success")
        }
      }).catch(function (error) {console.log(error);})
    },
  },
  getters:{},
  modules:{}
});

import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    // backendUrl: "https://kaofood.works/api",
    // backendUrl: "https://dev.kaofood.works/api",
    backendUrl: "http://localhost:8080",
    account: null,
    menus: [],
    categories: [],
    cart: [],
    search: null
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
      if (data == null || data == '') {
      state.account = null;
      return
    } 
      state.account = data
    },
    SET_SEARCH(state, data){
      state.search = data
    },
    addCartItem(state, item){
      if(item == null) return;
      item.count=1
      state.cart.push(item)
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
    async fetchLocalStorage({ commit }) {
        try {
          await axios.get(`${this.state.backendUrl}/user/login`,{withCredentials:true}).then(response => {
            if(localStorage.getItem('JWT')==null){
              localStorage.setItem('JWT',response.headers.jwt)
            }
            commit('SET_ACCOUNT', response.data)
            console.log(this.state.account)
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
        await axios.delete(`${this.state.backendUrl}/user/logout`,{withCredentials:true,headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
        commit('SET_ACCOUNT',null);
        localStorage.removeItem('JWT')
        localStorage.removeItem("cart");
      }else {
        await axios.get(`${this.state.backendUrl}/user/login?email=${loginForm.email}&password=${loginForm.password}`,{withCredentials:true})
            .then(response => {
              commit('SET_ACCOUNT', response.data)
              console.log(this.state.account)
              localStorage.setItem('JWT',response.headers.jwt)
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
    searchMenu({ commit }, items) {
      commit('SET_SEARCH', items)
      console.log(this.state.search)
    }
  },
  getters:{},
  modules:{}
});

<template>
  <div class="md:pt-28 pt-20 md:pb-14 pb-5 md:px-5 px-2 bg-salmon-light">
    <!-- If no item in cart -->
    <div v-if="cartList.length==0" class="text-center xl:py-32 lg:py-24 md:py-20 py-16">
      <i class="fas fa-box-open xl:text-9xl md:text-7xl text-5xl p-5"></i>
      <p class="xl:p-5 md:p-3 p-2 text-gray xl:text-lg text-sm">No any items in your cart</p>
      <router-link to="/menu" class="btn btn-secondary btn-sm rounded-2xl xl:text-lg xl:m-5 md:m-3 m-2">Choose your menu!</router-link>
    </div>
    <!-- If have item in CartList -->
    <div v-else>
      <div class="card bordered bg-white">
          <!-- Heading -->
          <div class="font-semibold flex flex-wrap bg-accent-focus p-3 xl:text-xl lg:text-lg md:text-base text-sm">
            <span class="w-1/3 md:text-center text-left">Menu</span>
            <span class="w-1/6 text-center">Price</span>
            <span class="w-1/3 text-center">Quantity</span>
            <span class="w-1/6 md:text-center text-right">Subtotal</span>
          </div>
          <!-- Loop for menu -->
          <div v-for="item in cartList" :key="item.id" class="flex flex-wrap p-2">
            <div class="w-1/3 font-normal lg:text-lg md:text-base text-sm py-2">
              <div class="flex flex-col">
                <img :src="this.$store.state.backendUrl+item.image" class="rounded lg:w-full md:w-2/3 w-24 flex-1 mx-auto object-cover">
                <span class="m-auto flex-1 xl:py-5 py-1 xl:text-xl text-center font-semibold">{{ item.name }}</span>
              </div>          
            </div>
            <!-- Subtotal -->
            <div class="w-1/6 grid grid-rows-2 m-auto lg:text-lg md:text-sm text-xs">
              <span class="row-span-2 lg:text-lg text-center">{{item.price}}</span>
            </div>
            <!-- Quantity -->
            <div class="w-1/3 m-auto flex flex-row lg:text-lg md:text-base text-sm">
              <button @click="decreaseAmount(item)" class="flex-1 btn btn-ghost btn-sm">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" disabled="disabled" v-model.number="item.count" class="input input-xs input-bordered flex-1 w-0 text-center p-0 mt-1 lg:text-lg">
              <button @click="increaseAmount(item)" class="flex-1 btn btn-ghost btn-sm">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <!-- total -->
            <div class="w-1/6 text-right lg:text-lg md:text-sm text-xs flex items-center justify-center relative">
              <button @click="removeCartItem(item)" class="btn btn-ghost w-1/3 absolute top-0 right-0">
                <i class="fas fa-trash-alt lg:text-lg"></i>
              </button>
              <!-- xl:mt-40 lg:mt-16 md:mt-5 mt-2 -->
              <div class="text-center">{{item.price * item.count}}</div>
            </div>
          </div>
        </div>
        <!-- Checkout -->
        <div class="md:grid md:grid-cols-4">
          <div class="card bordered md:w-full my-5 py-5 p-3 md:flex md:flex-wrap flex flex-col lg:col-start-4 md:col-start-3 md:col-end-5 bg-white">
            <div class="p-5">
              <span class="card-title text-xl"><i class="fas fa-utensils p-2"></i>Cart totals</span>
              <div class="text-center">
                <hr class="w-full text-gray">
              </div>
            </div>
            <div class="card-body text-fire-darkest text-lg font-semibold p-5 grid grid-cols-2">
              <!-- Total price -->
              <div>Total:</div>
              <div class="text-right mb-2">{{total}} ฿</div>
            </div>
            <button class="btn btn-accent w-full" @click="checkout()">Checkout</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      order :[]
    }
  },
  methods: {
    increaseAmount(item) {
      if(item.count == null ||  item.count == '' ) item.count=0;
      item.count += 1;
      localStorage.setItem('cart',JSON.stringify(this.$store.state.cart))
    },
    decreaseAmount(item) {
      if(item.count == null ||  item.count == '' ) item.count=0;
      item.count -= 1;
      if(item.count <=1 ) item.count=1;
      localStorage.setItem('cart',JSON.stringify(this.$store.state.cart))
    },
    removeCartItem(item){
      this.$store.dispatch('removeCart',item)
    },
    async checkout(){
      const axios = require('axios');
      for(let i of this.cartList){
        this.order.push({"menuId":i.id,"count":i.count})
      }
      console.log(this.order)
      try{
         await axios.post(`${this.$store.state.backendUrl}/order/new?userId=${this.$store.state.account.id}`,this.order,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
      } catch(error){
        console.log(error)
      }
      this.order=[]
      localStorage.removeItem("cart");
      for(let i of this.cartList){
        this.$store.dispatch('removeCart',i)
      }
    }
  },
  computed: {
    cartList() {
      return this.$store.state.cart;
    },
    total(){
      let total = 0
      for(let i of this.cartList){
        total += i.count*i.price;
      }
      return total;
    }
  }
};
</script>
<template>
  <div class="md:mt-28 mt-20 md:mb-14 mb-5 md:px-5 px-2 ">
    <!-- If no item in cart -->
    <div v-if="cartList.length==0" class="text-center xl:py-32 lg:py-24 md:py-20 py-16">
      <i class="fas fa-box-open xl:text-9xl md:text-7xl text-5xl p-5"></i>
      <p class="xl:p-5 md:p-3 p-2 text-gray xl:text-lg text-sm">No any items in your cart</p>
      <router-link to="/menu" class="btn btn-secondary btn-sm rounded-2xl xl:text-lg xl:m-5 md:m-3 m-2">Choose your menu!</router-link>
    </div>
    <!-- If have item in CartList -->
    <div v-else>
      <div class="card bordered md:grid md:grid-cols-4">
          <!-- Heading -->
          <div class="font-semibold flex flex-wrap bg-accent-focus p-3 md:col-start-1 md:col-end-5 xl:text-xl lg:text-lg md:text-base text-sm">
            <span class="w-1/3 text-left">Menu</span>
            <span class="w-1/6 text-center">Price</span>
            <span class="w-1/3 text-center">Quantity</span>
            <span class="w-1/6 text-right">Subtotal</span>
          </div>
          <!-- Loop for menu -->
          <div v-for="item in cartList" :key="item.id" class="flex flex-wrap p-2 md:col-start-1 md:col-end-5">
            <div class="w-1/3 font-normal lg:text-lg md:text-base text-sm py-2">
              <div class="grid grid-rows-2">
                <img :src="this.$store.state.backendUrl+item.image" class="rounded md:w-1/2 w-24 mx-auto object-cover">
                <span class="m-auto text-center font-semibold">{{ item.name }}</span>
              </div>          
            </div>
            <!-- Subtotal -->
            <div class="w-1/6 grid grid-rows-2 m-auto lg:text-lg md:text-sm text-xs">
              <span class="row-span-2 text-center">{{item.price}}</span>
            </div>
            <!-- Quantity -->
            <div class="w-1/3 m-auto flex flex-row lg:text-lg md:text-base text-sm">
              <button @click="decreaseAmount(item)" class="flex-1 btn btn-ghost btn-sm">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" disabled="disabled" v-model.number="item.count" class="input input-xs input-bordered flex-1 w-0 text-center p-0">
              <button @click="increaseAmount(item)" class="flex-1 btn btn-ghost btn-sm">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <!-- total -->
            <div class="w-1/6 text-right lg:text-lg md:text-sm text-xs grid-rows-2">
              <button @click="removeCartItem(item)" class="btn btn-ghost lg:text-lg md:text-sm text-xs w-1/2 row-span-1">
                <i class="fas fa-trash-alt"></i>
              </button>
              <div class="row-span-1 text-center 2xl:mt-36 xl:mt-20 lg:my-12 md:my-6 mt-3">{{item.price * item.count}}</div>
            </div>
          </div>
        </div>
        <!-- Checkout -->
        <div class="card bordered md:w-full my-5 py-5 p-3 md:flex md:flex-wrap flex flex-col lg:col-start-4 md:col-start-3 md:col-end-5">
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
          <button class="btn btn-accent w-full">Checkout</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
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
<template>
  <div id="cart" class="md:mt-28 mt-20 md:mb-14 mb-5 md:px-5 px-2">
    <!-- CartList -->
    <div class="card bordered">
        <!-- Heading -->
        <div class="font-semibold flex flex-wrap bg-accent-focus p-3 xl:text-xl lg:text-lg md:text-base text-sm">
          <span class="w-1/3 text-left">Menu</span>
          <span class="w-1/6 text-center">Price</span>
          <span class="w-1/3 text-center">Quantity</span>
          <span class="w-1/6 text-right">Subtotal</span>
        </div>
        <!-- Loop for menu -->
        <div v-for="item in cartList" :key="item.id" class="flex flex-wrap p-2">
          <div class="w-1/3 font-normal lg:text-lg md:text-base text-sm py-2">
            <div class="grid grid-rows-2">
              <img :src="this.$store.state.backendUrl+item.image" class="rounded md:w-1/2 w-24 object-cover">
              <span class="m-auto text-center">{{ item.name }}</span>
            </div>
            <!-- <button @click="removeCartItem(item)" class="btn btn-error md:btn-sm btn-xs w-1/2 md:justify-center mx-2 mt-2">Remove</button> -->
          </div>
          <!-- Subtotal -->
          <div class="w-1/6 grid grid-rows-2 m-auto lg:text-lg md:text-sm text-xs">
            <span class="row-span-2 text-center">{{item.price}}</span>
          </div>
          <!-- Quantity -->
          <div class="w-1/3 m-auto flex flex-row lg:text-lg md:text-base text-sm">
            <button @click="decreaseAmount(item)" class="flex-1 hover:bg-gray focus:bg-gray-light delay-100">
              <i class="material-icons">remove</i>
            </button>
            <input type="number" disabled="disabled" v-model.number="item.count" class="input input-xs input-bordered flex-1 w-0 text-center p-0">
            <button @click="increaseAmount(item)" class="flex-1 hover:bg-gray focus:bg-gray-light delay-100">
              <i class="material-icons">add</i>
            </button>
          </div>
          <!-- total -->
          <div class="w-1/6 m-auto text-right lg:text-lg md:text-sm text-xs">
            {{item.price * item.count}}
          </div>
        </div>
      </div>

    <!-- Checkout -->
    <div class="card bordered md:w-1/2 my-5 py-5 p-3 md:flex md:flex-wrap flex flex-col">
      <div class="p-5">
        <span class="card-title text-xl">Cart totals</span>
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
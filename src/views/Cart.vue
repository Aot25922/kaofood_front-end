<template>
  <div id="cart" class="md:mt-28 mt-20 md:mb-14 mb-5 md:mx-5 mx-1">
    <!-- CartList -->
    <div class="card bordered">
      <div class="flex flex-wrap font-semibold">
        <!-- Heading -->
        <div class="w-full flex flex-wrap bg-accent-focus p-3 xl:text-xl lg:text-lg md:text-base text-sm">
          <span class="w-1/2">Menu</span>
          <span class="text-center w-1/3">Quantity</span>
          <span class="text-right w-1/6">Subtotal</span>
        </div>
        <!-- Loop for menu -->
        <div v-for="item in cartList" :key="item.id">
          <div class="w-1/2 font-normal lg:text-lg md:text-base text-sm py-2">
            <div class="flex flex-row">
              <!-- Img didn't add oject-fit yet -->
              <img :src="this.$store.state.backendUrl+item.image" class="rounded md:w-1/2 w-1/3 ml-1">
              <span class="m-auto mx-2">{{ item.name }}</span>
            </div>
            <button @click="removeCartItem(item)" class="btn btn-error md:btn-sm btn-xs w-1/2 md:justify-center mx-2 mt-2">Remove</button>
          </div>
          <!-- Subtotal -->
          <div class="w-1/6 py-2 xl:mt-36 lg:mt-16 md:mt-7 mt-3 md:pr-3 text-right lg:text-lg md:text-sm text-xs">
            {{item.price}}
          </div>
          <!-- Quantity -->
          <div class="w-1/3 xl:mt-40 lg:mt-20 md:mt-8 mt-4 m-auto flex flex-row lg:text-lg md:text-base text-sm">
            <button @click="decreaseAmount(item)" class="flex-1 btn btn-xs btn-ghost p-0">
              <i class="material-icons">remove</i>
            </button>
            <input type="number" v-model.number="item.count" class="input input-xs input-bordered flex-1 w-1 text-center">
            <button @click="increaseAmount(item)" class="flex-1 btn btn-xs btn-ghost">
              <i class="material-icons">add</i>
            </button>
          </div>
          <!-- total -->
          <div class="w-1/6 py-2 xl:mt-36 lg:mt-16 md:mt-7 mt-3 md:pr-3 text-right lg:text-lg md:text-sm text-xs">
            {{item.price * item.count}}
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout -->
    <div class="card bordered md: md:w-1/2 my-5 mx-1 md:flex md:flex-wrap flex flex-col">
      <span class="card-title text-2xl p-5">Cart totals</span>
      <div class="card-body text-fire-darkest text-lg font-semibold pt-3 pb-8 px-10 grid grid-cols-2">
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
<template>
  <div id="about" class="p-3 lg:grid lg:grid-cols-2">
    <div class="lg:col-span-1">
      <img src="../assets/whyChooseUs.png" alt="Why choose us" class="mx-auto" />
    </div>
    <!-- Header -->
    <div class="lg:col-span-1">
      <div class="font-bold text-center md:text-4xl text-3xl py-1">
        <h1 class="text-red-700 pb-2" style="font-family: 'Allison', cursive;">Why Choose Us</h1>
        <h2>Why we are the best</h2>
      </div>
    <!-- body -->
      <p class="text-base text-gray-500 text-center lg:py-5 md:py-3 py-2">
        A, blandit euismod ullamcorper vestibulum enim habitasse. Ultrices
        tincidunt scelerisque elit enim. A neque malesuada in tortor eget justo
        mauris nec dolor. Consequat risus vitae, ac ac et preparation. He wanted
        to serve burgers, fries and beverages that tasted .
      </p>
      <div class="lg:py-5 md:grid md:grid-cols-2">
        <div class="card bordered md:col-span-1 flex-row md:m-3 my-2 p-3 justify-center font-semibold" v-for="card in cardList" :key="card.id">
          <img :src="card.img" class="w-10">
          <span class="pl-2 mt-2">{{ card.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data(){
    return{
      "cardList": [
        {
          id: 1,
          name: 'Fresh Food',
          img: 'https://image.flaticon.com/icons/png/512/135/135763.png'
        },
        {
          id: 2,
          name: 'Fast Delivery',
          img: 'https://image.flaticon.com/icons/png/512/609/609361.png'
        },
        {
          id: 3,
          name: 'Quality Maintian',
          img: 'https://image.flaticon.com/icons/png/512/1534/1534214.png'
        },
        {
          id: 4,
          name: '24/7 Service',
          img: 'https://image.flaticon.com/icons/png/512/2706/2706950.png'
        },
      ]
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Allison&display=swap');
</style>
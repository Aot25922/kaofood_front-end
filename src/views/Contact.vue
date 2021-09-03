<template>
  <div id="contact">
    <div class="xl:px-10 lg:p-5 p-3 lg:grid lg:grid-cols-2 lg:mt-24 md:mt-20 mt-16">
      <!-- About img Iphone to Ipad -->
      <img src="../assets/about-2.png" alt="About" class="mx-auto lg:hidden md:w-1/2 w-3/4" />
    <div class="lg:col-span-1 xl:mt-20">
      <div class="font-bold lg:text-left text-center md:text-4xl text-3xl py-1">
        <h1 class="text-red-700 pb-2" style="font-family: 'Allison', cursive">
          Our History
        </h1>
        <h2>Origins of the restaurant</h2>
      </div>
      <p class="text-base text-gray-500 lg:text-left text-center lg:py-5 md:py-3 py-2">
        Sharing knowledge and skills is what we do. With passion. That’s why the
        Alimentarium organises daily culinary workshops and classes led by
        qualified chefs. A neque malesuada in tortor eget justo mauris nec
        dolor. Consequat risus vitae, ac ac et preparation. 
        <br><br>Nunc quam nibh diam
        in eget. Tortor amet, eleifend sed viverra ac eu porta netus pulvinar.
        Quis sem donec pharetra viverra consectetur aliquam, platea egestas.
        Egestas quis fringilla cursus nullam. Nisl vulputate aliquam odio massa
        mattis.
      </p>
    </div>
    <!-- About img Ipad pro to Laptop -->
    <div class="lg:col-span-1">
      <img src="../assets/about-2.png" alt="About" class="mx-auto xl:w-1/2 lg:w-3/4 w-0" />
    </div>
    </div>
    <about class="xl:px-10 lg:p-5"/>
  </div>
</template>

<script>
import About from '@/components/About.vue'
export default {
  name: "Contact",
  components: { About },
  data() {
    return {
      teamList:[{id:62130500031, name: 'Thanasap Leelapisuth',img:'', role:['Frontend', 'Database']},
                {id:62130500033, name: 'Tanapat Kullakul',img:'', role:['Backend', 'Frontend']},
                {id:62130500043, name: 'Nithach Vassanapong',img:'', role:['Full Stack', 'Fixed Bug']}]
    }
  },
};
</script>
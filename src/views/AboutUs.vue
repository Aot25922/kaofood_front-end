<template>
    <Introduction intro="Contact With Us" header="About Us" msg="About Us" />
    <div class="xl:px-10 lg:p-5 p-3 lg:grid lg:grid-cols-2">
      <!-- About img Iphone to Ipad -->
      <img src="../assets/about-2.png" alt="About" class="mx-auto lg:hidden md:w-1/2 w-3/4"/>
      <div class="lg:col-span-1 xl:mt-20">
        <div class="font-bold lg:text-left text-center md:text-4xl text-3xl py-1">
          <h1 class="text-red pb-2 font-writing">
            Our History
          </h1>
          <h2>Origins of the restaurant</h2>
        </div>
        <p class="text-base text-gray lg:text-left text-center lg:py-5 md:py-3 py-2">
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
        <img src="../assets/about-2.png" alt="About" class="mx-auto xl:w-1/2 lg:w-3/4 w-0"/>
      </div>
    </div>
    <WhyWeAre class="xl:px-10 lg:p-5"/>
</template>

<script>
import WhyWeAre from '@/components/Content/WhyWeAre.vue'
import Introduction from '@/components/Content/Introduction.vue'

export default {
  name: "AboutUs",
  components: { WhyWeAre, Introduction },
};
</script>
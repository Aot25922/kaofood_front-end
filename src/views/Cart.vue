<template>
  <div id="cart" class="mt-20 m-1">
    <!-- หน้าตะกร้า -->
    <div class="card bordered">
      <div class="flex flex-wrap font-semibold">
        <!-- Heading -->
        <div class="w-full flex flex-wrap bg-accent-focus p-2">
          <span class="w-1/2">Menu</span>
          <span class="text-center w-1/4">Quantity</span>
          <span class="text-right w-1/4">Subtotal</span>
        </div>
        <!-- Loop for menu -->
        <div class="w-1/2 font-normal text-sm">
          <div class="flex flex-row">
            <!-- Img Show when medium size -->
            <img src="../assets/menutest.jpg" class="w-0">
            <span class="m-auto my-5">Menu Name Name</span>
          </div>
          <button class="btn btn-error btn-xs w-1/2 mx-2 mb-2">Remove</button>
        </div>
        <!-- Quantity -->
        <div class="w-1/4">

        </div>
        <!-- Subtotal -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
};
</script>
<template>
  <div id="orderManage" class="lg:pt-28 md:pt-24 pt-20 bg-fire-lightest p-5">
    <p class="font-bold p-5 text-2xl">Order Management</p>
    <div class="card p-5 bg-white">
      <div class="collapse w-full border rounded-box border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium ">
          Order Id: KF000001
        </div>
        <div class="collapse-content">
          <div class="overflow-x-auto">
            <table class="table text-center w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantyty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Some Name</td>
                  <td>20 ฿</td>
                  <td>6</td>
                  <td>120 ฿</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="divider"></div>
          <p class=""><b>Total:</b> 120 ฿</p>
        </div>
      </div>
      <ul class="w-full steps pt-5">
        <li class="step step-primary">Ordered</li>
        <li class="step step-primary">Cooking</li>
        <li class="step">Delivering</li>
        <li class="step">Arrived</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderManage",
  created() {
    this.$store.dispatch("fetchOrderDetailAPI");
  },
};
</script>
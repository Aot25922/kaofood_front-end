<template>
    <div id="orderManage" class="lg:pt-28 md:pt-24 pt-20 bg-fire-lightest p-5">
    <p class="font-bold p-5 text-2xl" v-if="account!=null">Order Management</p>
    <div class="card p-5 bg-white mb-8" v-for="order in orderList" :key="order.id">
      <div class="collapse w-full border rounded-box border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium ">
          {{order.id}}
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
              <tbody v-if="orderDetailList!=null">
                <tr v-for="orderDetail in orderDetailList.filter(list => {return list.orders.id == order.id})" :key="orderDetail.id" >
                  <th>{{orderDetail.id}}</th>
                  <td>{{orderDetail.menu.name}}</td>
                  <td>{{orderDetail.menu.price}} ฿</td>
                  <td>{{orderDetail.count}}</td>
                  <td>{{orderDetail.menu.price*orderDetail.count}} ฿</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="divider"></div>
          <p class=""><b>Total:</b> {{order.totalPrice}} ฿</p>
        </div>
      </div>
      <ul class="w-full steps pt-5">
        <li class="step" :class="{'step-primary':order.status.id>=status.id}" v-for="status in statusList " :key="status.id">{{status.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Order",
  data() {
      return {
       statusList : null,
       orderList : null,
       orderDetailList : null
      }
  },
  methods: {
    async getOrderList() {
      await axios
        .get(`${this.$store.state.backendUrl}/order`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        })
        .then((response) => {
          this.orderList = response.data;
        });
      console.log("Get Order Form API");
    },

    async getOrderDetailList() {
      await axios
        .get(`${this.$store.state.backendUrl}/orderdetail`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        })
        .then((response) => {
          this.orderDetailList = response.data;
        });
      console.log("Get OrderDetail Form API");
    },

    async getStatus() {
      await axios
        .get(`${this.$store.state.backendUrl}/status`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        })
        .then((response) => {
          this.statusList = response.data;
          // console.log(this.statusList)
        });
      console.log("Get Status Form API");
    },
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  created() {
    if (this.account) {
      this.getOrderList();
      this.getOrderDetailList();
      this.getStatus();
    }
  },
};
</script>
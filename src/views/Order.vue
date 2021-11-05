<template>
    <div class="lg:pt-28 md:pt-24 pt-20 bg-fire-lightest p-5">
    <!-- No Login -->
    <div v-if="account==null" class="w-full">
      <ErrorPage msg="No way bro! Thinking WHY?" image="batman.gif" css="xl:w-2/5 mx-auto rounded-md my-5"></ErrorPage>
    </div>
    <div v-else>
      <p class="font-bold p-5 text-2xl">Order Status</p>
      <div class="card p-5 bg-white mb-8" v-for="order in orderList" :key="order.id">
        <div class="collapse w-full border rounded-box border-base-300 collapse-arrow">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            Order Id: {{order.id}}
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
                <tbody v-for="orderDetail in order.orderDetail" :key="orderDetail.id">
                  <tr>
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
  </div>
</template>

<script>
import axios from "axios";
import ErrorPage from '@/components/ErrorPage.vue';

export default {
  name: "Order",
  components: { ErrorPage },
  data() {
      return {
       statusList : null,
       orderList : null
      }
  },
  methods: {
    async getOrderList() {
      await axios
        .get(`${this.$store.state.backendUrl}/order/user/${this.account.id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        })
        .then((response) => {
          this.orderList = response.data;
          console.log(this.orderList)
        });
      console.log("Get Order Form API");
    },
    async getStatus(){
      await axios.get(`${this.$store.state.backendUrl}/status`,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
        .then(response => {
          this.statusList = response.data
      })
      console.log("Get Status Form API")
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  created(){
    this.getOrderList();
    this.getStatus();
  }
};
</script>
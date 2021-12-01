<template>
  <div id="orderManage" class="bg-fire-lightest p-5 flex-grow">
    <div v-if="!accountRole" class="w-full">
      <ErrorPage msg="No way bro! Thinking WHY?" image="batman.gif" css="xl:w-2/5 mx-auto rounded-md my-5"></ErrorPage>
    </div>
    <div v-else>
    <p class="font-bold p-5 text-2xl">Order Management</p>
    <div class="card p-5 bg-white mb-8" v-for="order in orderList" :key="order.id">
      <div class="collapse w-full border rounded-box border-base-300 collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium ">
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
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="orderDetail in order.orderDetail" :key="orderDetail.id">
                  <th>{{orderDetail.id}}</th>
                  <td>{{orderDetail.menu.name}}</td>
                  <td>{{orderDetail.menu.price}} ฿</td>
                  <td>{{orderDetail.count}}</td>
                  <td>{{orderDetail.menu.price*orderDetail.count}} ฿</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <ul class="w-full steps pt-5">
          <li class="step" :class="{'step-primary':order.status.id>=status.id}" v-for="status in statusList" :key="status.id" @click="changeOrderStatus(order,status)">{{status.name}}</li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import ErrorPage from '@/components/ErrorPage.vue';

export default {
  name: "OrderManage",
  components: { ErrorPage },
  data(){
     return {
       statusList : null,
       orderList : null,
       orderDetailList : null
     }
  },
  methods:{
    async changeOrderStatus(order,status){
      order.status = status
      axios.put(`${this.$store.state.backendUrl}/admin/edit/order?orderId=${order.id}&statusId=${status.id}`,null,
          {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your order status has been changed',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },

    async getOrderList() {
      await axios.get(`${this.$store.state.backendUrl}/order`, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
          .then(response => {
            this.orderList = response.data
          })
    },

    async getStatus(){
      await axios.get(`${this.$store.state.backendUrl}/status`,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
        .then(response => {
          this.statusList = response.data
          console.log(this.statusList)
      })
    }
  },
  computed: {
    accountRole() {
      if(this.$store.state.account==null) return false;
      if(this.$store.state.account.role.name!='Member') return true;
      return false;
    },
  },
  created() {
    if(this.accountRole){
      this.getOrderList();
      this.getStatus();
    }
  },
};
</script>
<template>
  <div id="orderManage" class="lg:pt-28 md:pt-24 pt-20 bg-fire-lightest p-5">
    <p class="font-bold p-5 text-2xl">Order Management</p>
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
              <tbody>
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
        <li class="step" :class="{'step-primary':order.status.id>=status.id}" v-for="status in statusList " :key="status.id" @click="changeOrderStatus(order,status)">{{status.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderManage",
  data(){
     return {
       statusList : null
     }
  },
  methods : {
    async changeOrderStatus(order,status){
      const axios = require('axios');
       order.status=status
       console.log(localStorage.getItem('JWT'))
       try{
         axios.put(`${this.$store.state.backendUrl}/admin/edit/order?orderId=${order.id}&statusId=${status.id}`,null,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})  
      }catch(error){
        console.log(error)
      }
    },
async getStatus(){
      const axios = require('axios');
      try{
         axios.get(`${this.$store.state.backendUrl}/status`,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
         .then(response => {
           this.statusList = response.data
           console.log(this.statusList)
          })  
      }catch(error){
        console.log(error)
      }
    }
  },
  computed: {
    orderList() {
      return this.$store.state.order;
    },
    orderDetailList(){
      return this.$store.state.orderDetail
    }
  },
  created() {
    this.$store.dispatch("fetchOrderDetailAPI");
    this.$store.dispatch("fetchOrderAPI");
    this.getStatus()
  },
};
</script>
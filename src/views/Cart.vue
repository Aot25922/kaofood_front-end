<template>
  <div class="md:py-14 py-5 md:px-5 px-2 bg-salmon-light flex-grow">
    <!-- If no item in cart -->
    <div v-if="cartList.length==0" class="text-center xl:py-32 lg:py-24 md:py-20 py-16">
      <NoMenu text="No any items in your cart"/>
    </div>
    <!-- If have item in CartList -->
    <div v-else>
      <div class="card bordered bg-white">
          <!-- Heading -->
          <div class="font-semibold flex flex-wrap bg-accent-focus p-3 xl:text-xl lg:text-lg md:text-base text-sm">
            <span class="w-1/3 md:text-center text-left">Menu</span>
            <span class="w-1/6 text-center">Price</span>
            <span class="w-1/3 text-center">Quantity</span>
            <span class="w-1/6 md:text-center text-right">Subtotal</span>
          </div>
          <!-- Loop for menu -->
          <div v-for="item in cartList" :key="item.id" class="flex flex-wrap p-2">
            <div class="w-1/3 font-normal lg:text-lg md:text-base text-sm py-2">
              <div class="flex flex-col">
                <img :src="this.$store.state.backendUrl+item.image" class="rounded lg:w-full md:w-2/3 w-24 flex-1 mx-auto object-cover">
                <span class="m-auto flex-1 xl:py-5 py-1 xl:text-xl text-center font-semibold">{{ item.name }}</span>
              </div>          
            </div>
            <!-- Subtotal -->
            <div class="w-1/6 grid grid-rows-2 m-auto lg:text-lg md:text-sm text-xs">
              <span class="row-span-2 lg:text-lg text-center">{{item.price}}</span>
            </div>
            <!-- Quantity -->
            <div class="w-1/3 m-auto flex flex-row lg:text-lg md:text-base text-sm">
              <button @click="decreaseAmount(item)" class="flex-1 btn btn-ghost btn-sm">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" disabled="disabled" v-model.number="item.count" class="input input-xs input-bordered flex-1 w-0 text-center p-0 mt-1 lg:text-lg">
              <button @click="increaseAmount(item)" class="flex-1 btn btn-ghost btn-sm">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <!-- total -->
            <div class="w-1/6 text-right lg:text-lg md:text-sm text-xs flex items-center justify-center relative">
              <button @click="removeCartItem(item)" class="w-1/3 absolute top-0 right-0 animation">
                <i class="far fa-times-circle text-2xl"></i>
              </button>
              <!-- xl:mt-40 lg:mt-16 md:mt-5 mt-2 -->
              <div class="text-center">{{item.price * item.count}}</div>
            </div>
          </div>
        </div>
        <!-- Checkout -->
        <div class="md:grid md:grid-cols-5">
          <div class="card bordered md:w-full my-5 py-5 p-3 bg-white md:col-start-1 md:col-end-3" v-if="this.$store.state.account != null">
            <div class="p-5 pb-2"> 
              <span class="card-title text-xl">User Information</span>
              <router-link :to="{ name:'EditAccount', params: { id : account } }"><i class="far fa-edit absolute right-7"></i></router-link>
              <div class="text-center">
                <hr class="w-full text-gray">
              </div>
            </div>
            <div class="card-body">
              <div class="lg:grid lg:grid-cols-2">
                <p class="font-medium">FirstName: <span class="font-normal">{{ account.fname }}</span></p> 
                <p class="font-medium">LastName: <span class="font-normal">{{ account.lname }}</span></p>
              </div>
              <h3 class="font-semibold pt-2 text-lg">Your Address</h3>
              <p>&emsp;{{ account.address }}</p>
            </div>
          </div>
          <div class="card bordered md:w-full my-5 py-5 p-3 md:flex md:flex-wrap flex flex-col lg:col-start-4 md:col-start-4 md:col-end-6 bg-white">
            <div class="p-5 pb-2">
              <span class="card-title text-xl"><i class="fas fa-utensils p-2"></i>Cart Totals</span>
              <div class="text-center">
                <hr class="w-full text-gray">
              </div>
            </div>
            <label v-if="account!=null" class="label px-5">
                <span class="">Cash Deliverly</span> 
                <input type="radio" name="opt" checked="checked" class="radio">
            </label>
            <div class="card-body text-fire-darkest text-lg font-semibold px-5 flex-col">
              <!-- Total Price -->
              <div>Total Price: <span class="text-right mb-2">{{total}} ฿</span></div>
            </div>
            <div v-if="account!=null" @click="checkout()" class="btn btn-secondary w-full">Checkout</div>
            <router-link v-else class="btn btn-accent w-full" to="/login">Login to proceed order</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import NoMenu from '@/components/NoMenu.vue'

export default {
  name: "Cart",
  components: { NoMenu },
  data() {
    return {
      userList : null,
      roleList : null
    }
  },
  methods:{
    //โหลดข้อมูล userList
    async getUserList() {
      await axios.get(`${this.$store.state.backendUrl}/admin/allAccount`, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
          .then(response => { this.userList = response.data
      })
    },
    deleteUser(user){
      Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this! You are deleting ${user.fname} ${user.lname}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(() => {
        axios.delete(`${this.$store.state.backendUrl}/admin/delete/${user.id}`, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
            .then(() => {
              this.userList = this.userList.filter(list => {return list.id != user.id});
              Swal.fire(
                  'Deleted!',
                  'Your user has been deleted.',
                  'success'
              );
            }).catch(() => {
              Swal.fire(
                  'Oops...',
                  'Something went wrong!',
                  'error'
              );
            });
        });
    },
    editRoleUser(user, role){
      Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure to change ${user.fname} ${user.lname} role to ${role.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      }).then(() => {
        axios.put(`${this.$store.state.backendUrl}/admin/edit/role/${user.id}?roleId=${role.id}`, null,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
            .then(() => {
              Swal.fire(
                  'Role has been edited!',
                  'Your user has been changed role.',
                  'success'
              )
            }).catch(() => {
              Swal.fire(
                  'Oops...',
                  'Something went wrong!',
                  'error'
              )
            })
      })
    },
    async getStatus(){
      await axios.get(`${this.$store.state.backendUrl}/role`,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
      .then(response => { 
        this.roleList = response.data
      })
    },
    async checkout(){
      const axios = require('axios');
      for(let i of this.cartList){
        this.order.push({"menuId":i.id,"count":i.count})
      }
      try{
         await axios.post(`${this.$store.state.backendUrl}/order/new/${this.$store.state.account.id}`,this.order,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
      } catch(error){
        Swal.fire({
            icon: 'error',
            title: error.response.data,
            footer: `If you don't have any account, Please Sign Up first`
          })
      }
      this.order=[]
      localStorage.removeItem("cart");
      for(let i of this.cartList){
        this.$store.dispatch('removeCart',i)
      }
      this.$router.push("/");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Checkout successfully'
      })
    },
  },
  computed: {
    accountRole() {
      if(this.$store.state.account==null) return false;
      if(this.$store.state.account.role.name=='Admin') return true;
      return false;
    },
  },
  created() {
    if(this.accountRole){
      this.getUserList();
      this.getStatus();
    }
  }
};
</script>

<style scoped>
  .animation{
    transition-duration: 0.2s;
  }
  .animation:active{
    transform: scale(0.8);
  }
</style>
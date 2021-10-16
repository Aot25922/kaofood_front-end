<template>
  <div id="userManage" class="pt-32 p-5 bg-salmon-light h-screen">
    <!-- No permission -->
    <div v-if="account==null||account.role=='Member'||account.role=='Staff'" class="w-full">
      <div class="text-center mx-auto text-yellow font-bold">
        <i class="fas fa-exclamation-circle p-3 md:text-6xl text-5xl text-warning"></i> 
        <p class="lg:text-xl md:text-lg p-3 text-warning">You want to get in This page?</p>
        <img src="@/assets/batman.gif" class="xl:w-2/5 mx-auto rounded-md my-5 ">
        <p class="lg:text-xl md:text-lg p-3 text-error">No way bro! Thinking WHY?</p>
      </div>
    </div>

    <div v-else class="card bordered bg-white p-5">
      <div class="card-title pt-10">
        <h1 class="font-semibold md:text-2xl text-xl">User Dashboard</h1>
        <div class="divider m-0"></div>
      </div>
      <div class="overflow-x-auto">
        <table class="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-for="user in userList" :key="user.id">
            <tr>
              <th>{{ user.id }}</th>
              <td>{{ user.fname }} {{ user.lname }}</td>
              <td>{{ user.email }}</td>
              <td>
                <select v-model="user.role" id="role" name="role" @change="editRoleUser(user,user.role)">
                <option :value="role" v-for="role in this.$store.state.role" :key="role">{{ role }}</option>
                </select></td>
              <td>
                <button v-if="user.role!='Admin'" class="lg:text-lg text-primary-focus" @click="deleteUser(user)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountManage",
  methods:{
    async deleteUser(user) {
      const axios = require('axios');
      var result = confirm(`Are you sure to delete ${user.fname} ${user.lname}?`);
      if (result) {
        try {
          await axios.delete(`${this.$store.state.backendUrl}/admin/delete/${user.id}`, {withCredentials:true , headers : {"Authorization": `Bearer ${this.$store.state.JWT}`}});
          await this.$store.dispatch('fetchUserAPI');
        } catch (error) {
          console.log(`Could not get! ${error}`)
        }
      }
    },
    async editRoleUser(user,role){
      const axios = require('axios');
      // let data = new FormData()
      // data.append("role", role)
      var result = confirm(`Are you sure to change ${user.fname} ${user.lname} role to ${role}`);
      if(result){
        try{
        await axios.put(`${this.$store.state.backendUrl}/admin/role/${user.id}`,`role=${role}`, {withCredentials:true , headers : {"Authorization": `Bearer ${this.$store.state.JWT}`}})
        .then(response => {
            console.log(response);
          })  
        await this.$store.dispatch('fetchUserAPI');
        }catch(error){
          console.log(`Could not get! ${error}`)
        }
      }
    }
  },
  computed: {
    userList() {
      return this.$store.state.users
    },
    account() {
      return this.$store.state.account
    }
  },
  created() {
    this.$store.dispatch("fetchUserAPI");
  }
};
</script>
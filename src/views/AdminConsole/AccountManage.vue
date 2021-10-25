<template>
  <div id="userManage" class="lg:pt-32 md:pt-24 pt-20 lg:pb-8 md:pb-6 p-5 bg-salmon-light">
    <!-- No permission -->
    <div v-if="!accountRole" class="w-full">
      <!-- <div class="text-center mx-auto text-yellow font-bold">
        <i class="fas fa-exclamation-circle p-3 md:text-6xl text-5xl text-warning"></i> 
        <p class="lg:text-xl md:text-lg p-3 text-warning">You want to get in This page?</p>
        <img src="@/assets/batman.gif" class="xl:w-2/5 mx-auto rounded-md my-5 ">
        <p class="lg:text-xl md:text-lg p-3 text-error">No way bro! Thinking WHY?</p>
      </div> -->
      <ErrorPage msg="No way bro! Thinking WHY?" image="batman.gif"></ErrorPage>
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
                <option :value="role" v-for="role in this.roleList" :key="role">{{ role }}</option>
                </select></td>
              <td>
                <button v-if="user.role!='AdminConsole'" class="lg:text-lg text-primary-focus" @click="deleteUser(user)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ErrorPage from '@/components/ErrorPage.vue';

export default {
  name: "AccountManage",
  components: { ErrorPage },
  data() {
    return {
      userList : null,
      roleList : ["AdminConsole","Staff","Member"]
    }
  },
  methods:{
    //โหลดข้อมูล userList
    async getUserList() {
      await axios.get(`${this.$store.state.backendUrl}/admin/allAccount`, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
          .then(response => { this.userList = response.data })
      console.log("Get UserList Form API");
    },

    async deleteUser(user) {
      var result = confirm(`Are you sure to delete ${user.fname} ${user.lname}?`);
      if (result) {
        await axios.delete(`${this.$store.state.backendUrl}/admin/delete/${user.id}`, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}});
        await this.getUserList();
      }
    },

    async editRoleUser(user,role){
      var result = confirm(`Are you sure to change ${user.fname} ${user.lname} role to ${role}`);
      if (result) {
        await axios.put(`${this.$store.state.backendUrl}/admin/role/${user.id}`,`role=${role}`, {withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
          .then(response => { console.log(response); })
        await this.getUserList();
      }
    }
  },
  computed: {
    accountRole() {
      if(this.$store.state.account==null) return false;
      if(this.$store.state.account.role=='AdminConsole') return true;
      return false;
    },
  },
  created() {
    if(this.accountRole){
      this.getUserList();
    }
  }
};
</script>
<template>
  <div id="userManage" class="lg:py-8 md:py-6 p-5 bg-salmon-light flex-grow">
    <!-- No permission -->
    <div v-if="!accountRole" class="w-full">
      <ErrorPage msg="No way bro! Thinking WHY?" image="batman.gif" css="xl:w-2/5 mx-auto rounded-md my-5"></ErrorPage>
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
                <select v-model="user.role" id="role" name="role" @change="editRoleUser(user, user.role)">
                <option :value="role" v-for="role in this.roleList" :key="role.id">{{ role.name }}</option>
                </select></td>
              <td>
                <button v-if="user.role.name!='Admin'" class="lg:text-lg text-primary-focus" @click="deleteUser(user)"><i class="fas fa-trash-alt"></i></button>
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
import Swal from 'sweetalert2'
import ErrorPage from '@/components/ErrorPage.vue';

export default {
  name: "AccountManage",
  components: { ErrorPage },
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
      }).then((result) => {
        if(result.isConfirmed) {
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'You have been cancel to delete account :)',
            'error'
          )
          this.getUserList();
          this.getStatus();
        }
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
      }).then((result) => {
        if(result.isConfirmed) {
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'You have been cancel to change role :)',
            'error'
          )
          this.getUserList();
          this.getStatus();
        }
      })
    },
    async getStatus(){
      await axios.get(`${this.$store.state.backendUrl}/role`,{withCredentials:true , headers : {"Authorization": `Bearer ${localStorage.getItem('JWT')}`}})
      .then(response => { 
        this.roleList = response.data
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
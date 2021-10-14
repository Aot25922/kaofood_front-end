<template>
  <div id="userManage" class="pt-32 p-5 bg-salmon-light">
    <!-- Just template no responsive now -->
    <div class="card bordered bg-white p-5">
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
          <tbody>
            <tr>
              <th>{{ user.id }}</th>
              <td>{{ user.fname }} {{ user.lname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td class="flex flex-row">
                <span class="flex-1">edit</span>
                <span class="flex-1">delete</span>
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
  computed: {
    user(){
      console.log(this.$store.state.user)
      return this.$store.state.user
    }
  },
  beforeCreate(){
    this.$store.dispatch("fetchUserAPI");
  }
};
</script>
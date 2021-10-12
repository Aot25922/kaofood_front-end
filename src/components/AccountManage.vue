<template>
  <div id="accountManage" class="pt-32 p-5 bg-salmon-light">
      <!-- Just template no responsive now -->
    <div class="card bordered bg-white p-5">
    <div class="card-title pt-10">
        <h1 class="font-semibold md:text-2xl text-xl">User Dashboard</h1>
        <div class="divider m-0"></div>
    </div>  
      <div class="px-2">
        <div class="flex flex-wrap py-5 font-bold text-lg">
          <h2 class="w-1/12">#</h2>
          <h2 class="w-4/12">Name</h2>
          <h2 class="w-3/12">E-mail</h2>
          <h2 class="w-2/12">Role</h2>
          <h2 class="w-2/12">Actions</h2>
        </div>
        <div class="flex flex-wrap">
          <div class="w-1/12">1</div>
          <div class="w-4/12">AOT Noi</div>
          <div class="w-3/12">test.ot@mail.com</div>
          <div class="w-2/12">Admin</div>
          <div class="w-2/12 flex flex-row">
            <span class="flex-1">edit</span>
            <span class="flex-1">delete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "AccountManage"
};
</script>
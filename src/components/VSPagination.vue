<template>
  <div>
      <div class="btn-group">
        <button class="btn btn-xs">«</button> 
        <span v-for="(item, index) in new Array(6)" :key="index">
          <button class="btn btn-xs">{{ index + 1 }}</button>
        </span>
        <button class="btn btn-xs">»</button> 
      </div>
      <slot />
  </div>
</template>

<script>
export default {
  name: 'VSPagination'
}
</script>
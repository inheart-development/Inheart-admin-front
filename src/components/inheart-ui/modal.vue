<template>
  <div class="bg">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'modal'
  };
</script>

<style scoped>
  .bg {
    background: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1
  }
</style>

<template>
  <button @click="clicked" class="floating-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'floatingButton',
    methods: {
      clicked(event) {
        this.$emit('click', event);
      }
    }
  }
</script>

<style scoped>
  .floating-button {
    background: #2C3E50;
    height: 36px;
    width: 36px;
    border-radius: 48px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .3);
  }

  .floating-button img {
    height: 24px;
    width: 24px;
    padding: 4px;
  }
</style>

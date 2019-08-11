<template>
  <button @click="clicked">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'custom-button',
    methods: {
      clicked(event) {
        this.$emit('click', event);
      }
    }
  }
</script>

<style scoped>
  button {
    display: block;
    padding: 10px;
    border-radius: 1000px;
    transition: all .4s ease-in-out;
    font-weight: 300;
    font-size: 1rem;
    text-align: center;
    box-shadow: 0 5px 12px -3px rgba(85, 103, 134, 0.35);
  }
</style>

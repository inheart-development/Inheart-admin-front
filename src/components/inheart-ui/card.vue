<template>
  <div @click="clicked" class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card',
    methods: {
      clicked(event) {
        this.$emit('click',event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/style";

  .card {
    @include flex-center;
    padding: 20px;
    background: $background;
    height: auto;
    margin: 20px auto 0;
    width: 600px;
    max-width: calc(100vw - 60px);
    box-shadow: $box-shadow;
    transition: $transition;
    border-radius: $radius;
  }

  .dark .card {
    box-shadow: $dark-box-shadow !important;
    background: $dark-background !important;
    color: $dark-color !important;
  }
</style>

<template>
  <img :src="iconURL" :alt="alt" @click="$emit('click')">
</template>

<script>
  export default {
    name: 'icon',
    props: {
      name: String,
      alt: {
        type: String,
        default: ''
      }
    },
    computed: {
      iconURL() {
        return  `icon/${this.name}.svg`
      }
    }
  }
</script>

<style scoped>
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    user-select: none;
  }
</style>
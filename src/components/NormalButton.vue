<template>
  <div class="normal-button-wrapper" @click="clickButton(index)">
    <div 
      class="button-list-item normal-button"
      :class="isSelected && 'selected-item'"
    >{{content}}</div>
  </div>
</template>

<script>
export default {
  name: 'normal-button',
  props: ['content', 'index', 'isSelected'],
  methods: {
    clickButton(key) {
      this.$emit('click-button', key);
      this.changeSelectedButton(key);
    },
    changeSelectedButton(key) {
      if(!this.isSelected) this.$emit('change-selected-button', key);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/style";

  .normal-button-wrapper {
    position: relative;
    display: inline-block;
    padding: 5px;
  }

  .selected-item {
    background: #2C3E50 !important;
    border: 2px solid #2C3E50 !important;
    color: white !important;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .3) !important;
  }

  .normal-button {
    padding: 7px 10px;
    border-radius: 16px;
    border: 2px solid $theme-color;
    box-shadow: 0 3px 9px -3px rgba(85, 103, 134, 0.35);
    transition: all .4s ease-in-out;
    font-weight: 300;
    color: #3c4043;
    cursor: pointer;
  }

</style>
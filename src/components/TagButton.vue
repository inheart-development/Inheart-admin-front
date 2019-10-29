<template>
  <div class="tag-button-wrapper">
    <div class="button-list-item tag-button">{{content}}</div>
    <div class="delete-button" @click="deleteTag(index)"></div>
  </div>
</template>

<script>
export default {
  name: 'tag-button',
  props: ['content', 'index'],
  methods: {
    deleteTag(key) {
      this.$emit('deleteTag', key);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/style";

  .tag-button-wrapper {
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

  .tag-button {
    padding: 7px 10px;
    border-radius: 16px;
    border: 2px solid $theme-color;
    box-shadow: 0 3px 9px -3px rgba(85, 103, 134, 0.35);
    transition: all .4s ease-in-out;
    font-weight: 300;
    color: #3c4043;
  }
  
  .delete-button {
    position: absolute;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    padding: 7px 10px;
    border-radius: 16px;
    border: 2px solid $theme-color;
    box-shadow: 0 3px 9px -3px rgba(85, 103, 134, 0.35);
    top: 5px;
    left: 5px;
    opacity: 0;
    background-image: url('../assets/ic_clear.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 25px 25px;
    background-color: #fff;
    cursor: pointer;
  }

  .tag-button-wrapper:hover .delete-button {
    opacity: 1;
  }
</style>
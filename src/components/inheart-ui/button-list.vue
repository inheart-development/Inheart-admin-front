<template>
  <ul class="button-list">
    <li 
        :class="isSelected(index) ? 'selected-item' : ''"
        :key="index"
        @click="itemClicked(index)"
        class="button-list-item"
        v-for="(item,index) in items">
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'button-list',
    props: ['items', 'selectedItems'],
    methods: {
      itemClicked(index) {
        this.$emit('tag-click', index);
      },
      isSelected(index) {
        console.log(this.selectedItems.some(selected => selected === index));
        return this.selectedItems.some(selected => selected === index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/style";

  .selected-item {
    background: #2C3E50 !important;
    border: 2px solid #2C3E50 !important;
    color: white !important;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .3) !important;
  }

  .button-list {
    user-select: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
  }

  .button-list-item {
    width: auto;
    height: auto;
    margin: 5px;
    padding: 6px 10px;
    border-radius: 16px;
    border: 2px solid $theme-color;
    box-shadow: 0 3px 9px -3px rgba(85, 103, 134, 0.35);
    transition: all .4s ease-in-out;
    font-weight: 300;
    color: #3c4043;
    cursor: pointer;
  }

  .dark-button-list-item {
    color: #dee2e6;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .5);
    background: #495057;
    border: 2px solid #495057;
  }

  .dark-selected-item {
    background: #2C3E50 !important;
    border: 2px solid #2C3E50 !important;
    color: white !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .5) !important;
  }

</style>

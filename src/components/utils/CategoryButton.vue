<template>
  <div class="category-button" :class="{selected: isSelected}" @click="selectCategory">
    {{category}}
  </div>
</template>

<script>
export default {
  name: 'category-button',
  props: ['category', 'isSelected', 'categoryNo'],
  methods: {
    selectCategory() {
      this.$emit('select-category', this.categoryNo);
    },
  },
};
</script>

<style scoped>
.category-button {
  display: inline-block;
  padding: 3px 4px;
  border: 1px solid #fff;
  border-radius: 15px;
  color: #fff;
  text-align: center;
  font-size: 0.8em;
}

.category-button.selected {
  background: #fff;
  color: black;
}
</style>

<template>
  <div
    class="editable-component"
    :class="{editable: isEditable}"
    ref="editable"
    :contenteditable="isEditable"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    },
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.innerText);
    },
  },
};
</script>

<style scoped>
.editable-component.editable {
  outline: 1px solid black;
}
</style>

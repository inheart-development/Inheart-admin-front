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
  updated() {
    if (this.$refs.editable.innerText !== this.value) {
      this.$refs.editable.innerText = this.value;
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.innerText);
    },
  },
};
</script>

<style scoped>
.editable-component {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5em;
  line-height: 1em;
  word-break: break-all;
}

.editable-component.editable {
  outline: 0;
  border-bottom: 1px solid #6d6e72;
}
</style>

<template>
  <div :class="modalClass" class="bg">
    <!--    <div :style="modal_style" class="modal-container" ref="content">-->
    <slot></slot>
    <!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'modal',
    props: ['modal_style', 'is_open'],
    data() {
      return {};
    },
    computed: {
      modalClass() {
        return this.is_open ? 'show' : 'close';
      }
    },
    mounted() {
    }
  };
</script>

<style scoped>
  .bg {
    background: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1
  }

  .modal-container {
    background: white;
    width: 20rem;
    padding: 15px;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    box-shadow: 0 5px 12px -3px rgba(85, 103, 134, 0.35);
    transition: all .4s ease-in-out;
    z-index: 2
  }

  @keyframes modal-show {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
</style>

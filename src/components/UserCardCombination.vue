<template>
  <card class="user-card">
    <user-card
      v-show="!isDetailOpen"
      :user="user"
      @open-detail="changeDetailState(true)"
      @update="update"
    />
    <user-detail-card
      v-show="isDetailOpen"
      :num="user.userNo"
      @close-detail="changeDetailState(false)"
      @update="update"
    />
  </card>
</template>

<script>
  import UserCard from './UserCard.vue';
  import UserDetailCard from './UserDetailCard.vue';
  import Card from './inheart-ui/card';

  export default {
    props: ['user'],
    components: {
      Card,
      UserCard,
      UserDetailCard
    },
    data() {
      return {
        isDetailOpen: false,
      };
    },
    methods: {
      changeDetailState(value) {
        this.isDetailOpen = value;
      },
      update() {
        this.$emit('update');
      },
    },
  };
</script>

<style scoped>
  .user-card {
    height: 120px;
  }
</style>

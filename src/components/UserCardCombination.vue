<template>
  <div>
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
  </div>
</template>

<script>
import UserCard from './UserCard.vue';
import UserDetailCard from './UserDetailCard.vue';

export default {
  props: ['user'],
  components: { UserCard, UserDetailCard },
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

</style>

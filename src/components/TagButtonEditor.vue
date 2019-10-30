<template>
  <div class="">
    <div class="tag-container">
      <tag-button 
      v-for="(tag, index) in tags"
      :content="tag"
      :key="index"
      :index="index"
      @deleteTag="deleteTag" />
    </div>
    <div class="tag-input-container">
      <input class="tag-input" :value="newTag" @change="changeNewTag" type="text" placeholder="태그를 입력해주세요."/>
      <button class="submit-button" @click="createTag(newTag)">입력</button>
    </div>
  </div>
</template>

<script>
import TagButton from './TagButton';

export default {
  name: 'tag-button-editor',
  components: {
    TagButton
  },
  props: ['tags', 'newTag'],
  methods: {
    createTag(tag) {
      if(tag.length > 0) this.$emit('createTag', tag);
      else alert('빈 태그는 만들 수 없습니다.');
    },
    changeNewTag(e) {
      this.$emit('changeTag', e.target.value);
    },
    deleteTag(index) {
      this.$emit('deleteTag', index);
    }
  },
}
</script>

<style lang="scss" scoped>

.tag-container {
  min-height: 46px;
}

.tag-input-container {
  display: flex;
}

.tag-input {
  flex: 1;
  margin-right: 25px;
  border-bottom: 1px solid #6d6e72;
  background: none;
  font-size: 1rem;
  padding: 5px;
}

.submit-button {
  position: relative;
  padding: 7px 13px;
  border-radius: 26px;
  border: 2px solid #2C3E50;
  background: #2C3E50;
  color: #fff;
  font-size: 1.3rem;
}

.submit-button:active {
  top: 1px;
}
</style>
<template>
  <div class="album-selector">
    <div class="search-form">
      <input class="custom-input" type="text" :value="searchWord" placeholder="검색어를 입력해주세요.">
      <normal-button content="검색" index="2" @click-button="onSearchMeditation"/>
      <p class="selected-number">{{selectedMeditations.length}} 개</p>
    </div>
    <div class="meditation-container">
      <card
        class="meditation-card custom-card"
        v-for="meditation in meditations"
        :key="meditation.id"
        :class="isSelectedCard(meditation.id) && 'selected'"
        @click="selectMeditation(meditation.id)"
      >
        <div class="meditation-card-description">
          <p class="title">{{meditation.title}}</p>
          <p>{{meditation.content}}</p>
        </div>
        <img class="meditaiton-card-cover" :src="meditation.cover" alt="커버 이미지" />
      </card>
    </div>
  </div>
</template>

<script>
  import Card from './inheart-ui/card';
  import NormalButton from './NormalButton';

  export default {
    name: 'album-selector',
    components: {
      Card,
      NormalButton
    },
    props: ['selectedMeditations', 'meditations'],
    data() {
      return {
        searchWord: ''
      };
    },
    methods: {
      onSearchMeditation() {
        this.$emit('search-meditation');
			},
			onModifyAlbum() {
				this.$emit('modify-album');
      },
      isSelectedCard(id) {
        return this.selectedMeditations.some(val => id === val);
      },
      selectMeditation(id) {
        this.$emit('select-meditation', id);
      }
    },
  };
</script>

<style scoped>
.album-selector {
  width: 100%;
}

.meditation-card {
  width: auto;
  justify-content: flex-start;
  position: relative;
}

.meditation-card-description > .title{
  margin-bottom: 10px;
  font-weight: bold;
}

.meditaiton-card-cover {
  position: absolute;
  right: 20px;
  height: 50px;
  width: 50px;
}

.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.selected-number {
  position: absolute;
  right: 0px;
}

.custom-input {
  border-bottom: 1px solid #6d6e72;
  background: none;
  font-size: 1rem;
  padding: 5px;
  font-weight: 300;
  width: 200px;
}

.meditation-card.selected {
  background-color: #8187e6;
  color: #fff;
}

.custom-card {
  box-shadow: none;
  border: 1px solid rgba(85,103,134,0.35);;
}

.meditation-container {
  height: 300px;
  overflow: auto;
}
</style>

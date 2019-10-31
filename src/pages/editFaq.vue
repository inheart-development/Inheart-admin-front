<template>
  <div class="container">
    <page-header :title="isOnModifynig ? '앨범 수정' : '앨범 생성'"/>
    <div>
      <card class="edit-album-container">
        <h2 class="title">앨범</h2>
        <div class="input-item">
          <label class="custom-label login-label" for="title">제목</label>
          <input
            class="custom-input"
            id="title"
            placeholder="제목을 입력해주세요."
            type="text"
            v-model="albumTitle"
            autocomplete="off"
          />
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="explain">내용</label>
          <textarea
            class="custom-input"
            id="content"
            placeholder="내용을 입력해주세요."
            type="text"
            v-model="albumExplain"
            autocomplete="off"
          />
        </div>
        <album-selector
          @select-meditation="selectMeditation"
          :selectedMeditations="selectedMeditations"
          :meditations="meditations"
        />
      </card>
      <div class="button-container">
        <div class="btn-card-container">
          <card v-if="!isOnModifynig" class="btn-card" @click="updateAddAlbum">업로드</card>
          <card v-if="isOnModifynig" class="btn-card" @click="updateModifyAlbum">업로드</card>
        </div>
        <div class="btn-card-container">
          <router-link to="/album">
            <card class="btn-card">닫기</card>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import AlbumSelector from '../components/AlbumSelector';
  import { getMeditations, getDetailMeditation } from '../lib/content';
  import { addAlbum, getDetailAlbum, modifyAlbum } from '../lib/album';
  export default {
    name: 'edit-album',
    props: ['albumNo'],
    components: { Card, pageHeader, AlbumSelector },
    data() {
      return {
        selectedMeditations: [],
        albumTitle: '',
        albumExplain: '',
        meditations: null
      }
    },
    computed: {
      isOnModifynig() {
        return !!this.albumNo;
      }
    },
    methods: {
      selectMeditation(id) {
        const index = this.selectedMeditations.indexOf(id)
        console.log(index)
        if(index >= 0) this.selectedMeditations = this.selectedMeditations.filter(val => val !== id);
        else this.selectedMeditations = [...this.selectedMeditations, id];
      },
      async updateMeditations() {
        const response = await getMeditations();
        const { data } = response;
        this.meditations = data.data;
      },
      async updateAddAlbum() {
        await addAlbum({
          albumTitle: this.albumTitle,
          albumExplain: this.albumExplain,
          meditationList: this.selectedMeditations
        })
        this.$router.push('album');
      },
      async updateModifyAlbum() {
        await modifyAlbum({
          albumTitle: this.albumTitle,
          albumExplain: this.albumExplain,
          meditationList: this.selectedMeditations,
          albumNo: this.albumNo
        });
        this.$router.push('album');
      },
      async updateAlbumInfo() {
        const response = await getDetailAlbum(this.albumNo);
        const { data } = response;
        this.albumTitle = data.data.albumTitle;
        this.albumExplain = data.data.albumExplain;
        this.selectedMeditations = data.data.selectedMeditations || [];
      }
    },
    mounted() {
      this.updateMeditations();
      if(this.isOnModifynig) {
        this.updateAlbumInfo()
      }
    },
  };
</script>

<style scoped>
.container {
  max-height: 100vh;
  overflow: auto;
  flex-direction: column;
  padding: 10px 10px 30px 10px;
}

.edit-album-container {
  flex-direction: column;
  align-items: flex-start;
}

.input-item {
  width: 100%;
  margin: 15px 15px 15px 0;
}

.custom-input {
  border: 0;
  border-bottom: 1px solid #6d6e72;
  background: none;
  font-size: 1rem;
  padding: 5px;
  width: 100%;
  font-weight: 300;
}

textarea {
    resize: none;
  }
</style>

<template>
  <div class="container">
    <page-header :title="isOnModifying ? '명상 수정' : '명상 생성'"/>
    <div>
      <card class="edit-album-container">
        <div class="input-item">
          <label class="custom-label login-label" for="title">제목</label>
          <input
            class="custom-input"
            id="title"
            placeholder="제목"
            type="text"
            v-model="meditationTitle"
            autocomplete="off"
          >
        </div>
        <tag-button-editor
          class="input-item"
          :tags="meditationTag"
          :newTag="newTag"
          @createTag="createTag"
          @changeTag="changeNewTag"
          @deleteTag="deleteTag"
        />
        <div class="input-item">
          <label class="custom-label login-label" for="explain">설명</label>
          <input
            class="custom-input"
            id="explain"
            placeholder="설명"
            type="text"
            v-model="meditationExplain"
            autocomplete="off"
          >
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="audio">{{isOnModifying ? '수정용 오디오' : '오디오'}}</label>
          <br>
          <input
            type="file"
            ref="meditationFile"
            @change="handleFileUpload('meditationFile')"
            id="audio"
          />
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="cover">{{isOnModifying ? '수정용 커버 이미지' : '커버 이미지'}}</label>
          <br>
          <input
            type="file"
            ref="meditationCover"
            id="meditationCover"
            @change="handleFileUpload('meditationCover')"
          />
        </div>
        <div class="preview" v-show="coverImageUrl === ''">미리보기</div>
        <img class="preview" v-show="coverImageUrl !== ''" :src="coverImageUrl" alt="">
      </card>
      <card v-show="isOnModifying" class="btn-card" @click="updateModifyMeditation">업로드</card>
      <card v-show="!isOnModifying" class="btn-card" @click="updataAddMeditation">업로드</card>
      <router-link to="/content">
        <card class="btn-card">닫기</card>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import AlbumSelector from '../components/AlbumSelector';
  import { addMeditation, getDetailMeditation, modifyMeditation } from '../lib/content';
  import { staticFileUrl } from '../lib/setting.json';
  import TagButtonEditor from '../components/TagButtonEditor';

  export default {
    name: 'edit-meditation',
    props: ['meditationNo'],
    components: { Card, pageHeader, AlbumSelector, TagButtonEditor },
    data() {
      return {
        meditationTitle: '',
        meditationTag: [],
        meditationExplain: '',
        meditationFile: '',
        meditationCover: '',
        coverImageUrl: '',
        newTag: ''
      }
    },
    computed: {
      isOnModifying() {
        return !!this.meditationNo;
      }
    },
    methods: {
      changeNewTag(tag) {
        this.newTag = tag;
      },
      deleteTag(index) {
        this.meditationTag = this.meditationTag.filter((tag, i) => i !== index);
      },
      createTag(tag) {
        this.meditationTag = [...this.meditationTag, tag];
        this.newTag = '';
      },
      handleFileUpload(refName) {
        var file;
        switch (refName) {
        case 'meditationFile':
          file = this.$refs[refName].files[0];
          this.meditationFile = file;
          break;
        case 'meditationCover':
          file = this.$refs[refName].files[0];
          const url = URL.createObjectURL(file);
          this.meditationCover = file;
          this.coverImageUrl = url;
          break;
        }
      },
      async updateMeditaionInfo(id) {
        const response = await getDetailMeditation(id);
        const { data } = response;
        this.meditationTitle = data.data.meditationTitle;
        this.meditationExplain = data.data.meditationExplain;
        this.meditationTag = data.data.meditationTag;
      },
      async updataAddMeditation() {
        const formdata = new FormData();
        formdata.append('meditationTitle', this.meditationTitle);
        formdata.append('meditationTag', this.meditationTag);
        formdata.append('meditationExplain', this.meditationExplain);
        if(!!this.meditationFile) formdata.append('meditationFile', this.meditationFile);
        if(!!this.meditationCover) formdata.append('meditationCover', this.meditationCover);
        await addMeditation(formdata);
        this.$router.push('content');
      },
      async updateModifyMeditation() {
        const formdata = new FormData();
        formdata.append('meditationNo', this.meditationNo);
        formdata.append('meditationTitle', this.meditationTitle);
        formdata.append('meditationTag', this.meditationTag);
        formdata.append('meditationExplain', this.meditationExplain);
        if(this.meditationFile !== '') formdata.append('meditationFile', this.meditationFile);
        if(this.meditationCover !== '') formdata.append('meditationCover', this.meditationCover);
        await modifyMeditation(formdata);
        this.$router.push('content');
      }
    },
    mounted() {
      if(this.isOnModifying) this.updateMeditaionInfo(this.meditationNo);
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
  margin: 10px 0;
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
.preview {
  width: 250px;
  height: 250px;
  align-self: center;
  background: #f0f0f0;
  text-align: center;
  line-height: 250px;
  margin: 10px auto 0;
}

label {
  font-weight: 500;
  font-size: 18px;
  }
</style>

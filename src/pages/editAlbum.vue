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
            v-model="title"
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
            v-model="content"
            autocomplete="off"
          />
        </div>
        <album-selector @select-meditation="selectMeditation" :selectedMeditations="selectedMeditations" :meditations="meditations" />
      </card>
      <div class="button-container">
        <div class="btn-card-container">
          <card class="btn-card"> 업로드</card>
        </div>
        <div class="btn-card-container">
          <card class="btn-card">닫기</card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import AlbumSelector from '../components/AlbumSelector';

  export default {
    name: 'edit-album',
    props: ['modify'],
    components: { Card, pageHeader, AlbumSelector },
    data() {
      return {
        selectedMeditations: [],
        title: '',
        content: '',
        meditations: [
          {
						id : 1,
						title : "명상제목",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
						cover : "이미지 경로"
					},
					{
						id : 2,
						title : "명상제목2",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
						cover : "이미지 경로"
					},
					{
						id : 3,
						title : "명상제목2",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
            cover: '123'
          },
          {
						id : 4,
						title : "명상제목2",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
            cover: '123'
          },
          {
						id : 5,
						title : "명상제목2",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
            cover: '123'
          }
        ],
      }
    },
    computed: {
      isOnModifynig() {
        return this.modify === 'true';
      }
    },
    methods: {
      selectMeditation(id) {
        const index = this.selectedMeditations.indexOf(id)
        console.log(index)
        if(index >= 0) this.selectedMeditations = this.selectedMeditations.filter(val => val !== id);
        else this.selectedMeditations = [...this.selectedMeditations, id];
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

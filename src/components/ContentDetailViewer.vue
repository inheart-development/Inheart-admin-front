<template>
  <div class="content-detail-viewer">
    <div class="content-detail-container">
      <img class="close-icon" @click="onCloseViewer" src="../assets/ic_clear.png" alt="clear">
      <h2 class="title">명상 컨텐츠</h2>
      <select v-model="selected">
        <option value="0">머리비우기</option>
        <option value="1">마음비우기</option>
        <option value="2">마음채우기</option>
        <option value="3">글로명상하기</option>
      </select>
      <input type="text" v-model="title" placeholder="글 제목" />
      <input type="text" v-model="explain" placeholder="글 설명"/>
      <input type="file" ref="audio" @change="handleFileUpload(setAudio, 'audio')"/>
      <img class="preview" v-if="coverImageUrl !== ''" :src="coverImageUrl" />
      <div class="preview" v-else>미리보기</div>
      <input type="file" ref="cover" @change="handleFileUpload(setCover, 'cover')"/>
      <textarea v-if="selected === '3'" />
      <div class="upload">업로드</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'content-detail-viewer',
  props: [''],
  data() {
    return {
      selected: '카테고리',
      title: '',
      explain: '',
      audio: '',
      coverImage: '',
      coverImageUrl: '',
    };
  },
  methods: {
    handleFileUpload(setFunc, refName) {
      switch (refName) {
        default:
          // eslint-disable-next-line
          let file;
          break;
        case 'audio':
          // eslint-disable-next-line
          file = this.$refs[refName].files[0];
          setFunc(file);
          break;
        case 'cover':
          // eslint-disable-next-line
          file = this.$refs[refName].files[0];
          // eslint-disable-next-line
          const url = URL.createObjectURL(file);
          setFunc(file, url);
          break;
      }
      // this.audio = this.$refs.audio.files[0];
      // this.coverImageUrl = URL.createObjectURL(this.audio);
    },
    setAudio(file) {
      this.audio = file;
    },
    setCover(file, url) {
      this.coverImage = file;
      this.coverImageUrl = url;
    },
    onCloseViewer() {
      this.$emit('close-viewer');
    },
  },
};
</script>

<style scoped>
.content-detail-viewer {
  width:90vw;
  height: 90vh;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.content-detail-container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-icon {
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  top: 1em;
  right: 1em;
}

.title {
  text-align: center;
  margin: 0;
  margin-top: 2rem;
}

.preview {
  width: 300px;
  height: 300px;
  align-self: center;
  background: #f0f0f0;
  text-align: center;
  line-height: 300px;
}

.upload {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background: #f0f0f0;
  padding: 0.5em 0;
}
</style>

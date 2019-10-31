<template>
  <div class="container">
    <page-header :title="isOnModifynig ? '앨범 수정' : '앨범 생성'"/>
    <div>
      <card class="edit-album-container">
      </card>
      <div class="button-container">
        <div class="btn-card-container">
          <card class="btn-card"> 업로드</card>
        </div>
        <div class="btn-card-container">
          <router-link to="/content">
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

  export default {
    name: 'edit-meditation',
    props: ['id'],
    components: { Card, pageHeader, AlbumSelector },
    data() {
      return {
        selectedMeditations: [],
        title: '',
        content: '',
      }
    },
    computed: {
      isOnModifynig() {
        return !!this.id;
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

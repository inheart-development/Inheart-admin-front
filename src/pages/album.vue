<template>
  <div class="container flex-center">
		<div>
			<page-header title="앨범 관리"/>
			<card @click="openEditor" class="add-btn">
				추가하기
			</card>
			<card
				class="album-card"
				v-for="album in albums"
				:key="album.id"
				@click="openViewer"
			>
				<p>{{album.title}}</p>
				<p>{{album.content}}</p>
			</card>
		</div>
		<album-editor
			v-if="isEditorOpened"
			@close-editor="closeEditor"
			:isOnModifying="isOnModifying"
		/>
		<album-viewer v-if="isViewerOpened" @close-viewer="closeViewer" @modify-album="modifyAlbum" />
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
	import PageHeader from '../components/PageHeader';
	import AlbumEditor from '../components/AlbumEditor';
	import AlbumViewer from '../components/AlbumViewer';

	export default {
    name: 'album',
		components: { Card, PageHeader, AlbumEditor, AlbumViewer },
		data() {
			return {
				albums: [
					{
						id: 1,
						title : "as1df",
						content : "asdf"
					},
					{
						id: 2,
						title : "as2df",
						content : "asdf"
					},
					{
						id: 3,
						title : "as3df",
						content : "asdf"
					}
				],
				isEditorOpened: false,
				isViewerOpened: false,
				isOnModifying: false
			}
		},
		methods: {
			openEditor() {
				this.isEditorOpened = true;
			},
			closeEditor() {
				this.isEditorOpened = false;
				this.isOnModifying = false;
			},
			openViewer() {
				this.isViewerOpened = true;
			},
			closeViewer() {
				this.isViewerOpened = false;
			},
			modifyAlbum() {
				this.isViewerOpened = false;
				this.isEditorOpened = true;
				this.isOnModifying = true;
			}
		},
  };
</script>

<style scoped>
.album-card {
	min-height: 100px;
	height: auto;
	display: block;
}

.add-btn {
    height: 70px;
    font-size: 20px;
    cursor: pointer;
  }
</style>

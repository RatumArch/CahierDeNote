<template>
  <h1><input type="text" placeholder="titre" class="editable-title" v-model="editableTitle" /></h1>
  <div class="main">
    <NoteEditor :content="content" :title="title" :sendToMongo="sendToMongo" />
  </div>

</template>
y/2
<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route= useRoute()
const content = ref('')
const title= ref(route.params?.document);console.log(title.value);console.log("/title");
const editableTitle = ref(route.params?.document);console.log(route.params?.document);console.log(route.params);

const getContent = () => 
  axios.get('/api/findNoteByTitle', {
    data: {
      title: title.value,
      folderCode: route.params?.folderCode
    }
  })
    .then(res => {
        content.value=res.data?.html ?? "<strong>no html</strong>"; console.log(res.data?.html);
        })
    .catch(() => { 
      content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
      })

const sendToMongo = (data: any, rawText: any, extra?: any) => {
      axios.put('/api/updateNote', {
        title: title.value,
        folderCode: route?.params?.folderCode,
        newTitle: editableTitle.value,
        data,
        rawText,
        extra
      })
    }

 getContent()

</script>

<style scoped>
.editable-title {
    border: none;
    font-size: inherit;
    padding-left: 5px;
  }
</style>
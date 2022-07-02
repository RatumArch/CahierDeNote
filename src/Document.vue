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
const title= ref(route.params?.document)
const editableTitle = ref(route.params?.document)

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
      console.error("Document.vue - requête axios" );
      content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
      })

const sendToMongo = (data: any, rawText: any, extra?: any) => { 
      axios.post('/api/insertNote', {html: data, raw: rawText, title, extra})

      axios.put('/api/updateNote', {
        title: route?.params?.title,
        folderCode: route?.params?.folderCode,
        newTitle: editableTitle.value,
        data,
        rawText,
        extra
      })
    }

 getContent()
 onMounted(() => {
  console.log(route.params);
  
 })

</script>

<style scoped>
.editable-title {
    border: none;
    padding-left: 5px;
  }
</style>
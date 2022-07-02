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
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route= useRoute()
const content = ref('')
const title= ref('')
const editableTitle = ref(route.params?.document);console.log(route.params?.document);console.log(route.params);

onMounted(() => {
  title.value= <string>route.params?.document
  editableTitle.value = route.params?.document
})

const getContent = () => 
  axios.get('/api/findNoteByTitle', {
    data: {
      folderCode: route.params?.folderCode,
      title: route.params?.document
    }
  })
    .then(res => {
        content.value=res.data?.html ?? res.data?.raw ?? "<strong>Error :</strong> no text found"; console.log(res.data?.html);
        })
    .catch(() => { 
      content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
      })

const sendToMongo = (htmlContent: string, rawText: string, extra?: any) => {
  const newTitle = editableTitle.value!==title.value ? editableTitle.value : null
      axios.put('/api/updateNote', {
        title: route.params?.document,
        folderCode: route?.params?.folderCode,
        newTitle,
        html: htmlContent,
        raw: rawText,
        extra
      })
    }

 onBeforeMount(() => {
  getContent()
 })

</script>

<style scoped>
.editable-title {
    border: none;
    font-size: inherit;
    padding-left: 5px;
  }
</style>
<template>

  <div class="main">
    <NoteEditor :content="content" :title="title" />
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

 getContent()
 onMounted(() => {
  console.log(route.params);
  
 })

</script>

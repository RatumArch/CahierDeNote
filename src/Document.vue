<template>

  <div class="main">
    <NoteEditor :content="content" />
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
const getContent = () => 
  axios.get('/api/findNoteByTitle', {
    data: {
      title: route.params?.title,
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

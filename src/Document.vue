<template>
  <NoteEditor :content="content" />
</template>
y/2
<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { ref } from 'vue';

const content = ref('')
const getContent = () => axios.get('/api/findLastNote')
                              .then(res => {
                                  content.value=res.data?.html ?? "<strong>no html</strong>";
                                  })
                              .catch(() => { 
                                console.error("Document.vue - requête axios" );
                                content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
                                })

 getContent()

</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css");
.content {
  border-style: solid;
  border-color: black;
}
</style>
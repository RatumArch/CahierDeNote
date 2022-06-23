<template>
<div v-html="content">
</div>
<div v-html="equation"></div>
  <NoteEditor :content="equation" />
</template>
y/2
<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { ref } from 'vue';
import katex from 'katex';

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
 const equation = ref('')
 equation.value = katex.renderToString('(x^2 + \\alpha^2 )');  

</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css");
.content {
  border-style: solid;
  border-color: black;
}
</style>
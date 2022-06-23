<template>
<div class="equation">
  {{content}}
</div>
  <NoteEditor :content="content" />
</template>

<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { ref } from 'vue';

const content = ref('')
const getContent = () => axios.get('/api/findLastNote')
                              .then(res => {
                                  content.value=res.data?.html ?? "<strong>no html</strong>"; console.log(res.data?.html);
                                  })
                              .catch(() => { 
                                console.error("Document.vue - requête axios" );
                                content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
                                })

 getContent()

</script>

<style>
.content {
  border-style: solid;
  border-color: black;
}
</style>
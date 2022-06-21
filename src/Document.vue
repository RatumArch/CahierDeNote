<template>
  <div v-html="content" class="content" >
  </div>
  <NoteEditor :content="content" />
</template>

<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { onMounted, ref } from 'vue';

const content = ref('')
const getContent = () => axios.get('/api/findLastNote').then(res => {content.value=res.data?.html ?? "<strong>nono</strong>"; console.log(res.data?.html);
 })
 .catch(() => { console.error("Document.vue - requête axios" );
 })

 onMounted(() => getContent())

</script>

<style>
.content {
  border-style: solid;
  border-color: black;
}
</style>
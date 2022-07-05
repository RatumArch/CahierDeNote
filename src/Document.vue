<template>
  <h1><input type="text" placeholder="Titre" class="editable-title" v-model="editableTitle" /></h1>
  <div class="main">
    <NoteEditor :content="content" :title="title" :sendToMongo="sendToMongo"  />
  </div>

</template>
y/2
<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { saveDocument } from '../utils';

const route= useRoute()
const content = ref('')
const title= ref(route.params?.document)
const editableTitle = ref(route.params?.document);
const folderCode=ref<string|string[]>(route.params?.folderCode)

onMounted(() => {
  //title.value= <string>route.params?.document
  editableTitle.value = route.params?.document
  //folderCode.value = route.params?.folderCode
  console.log(folderCode.value);
  
})

const getContent = () => 
  axios.get('/api/findNoteByTitle', {
    params: {
      folderCode: folderCode.value,
      title: title.value
    }
  })
    .then(res => {
        content.value=res.data?.html ?? res.data?.raw ?? "<strong>Error :</strong> no text found"; console.log(res.data?.html);
        })
    .catch(() => { 
      content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
      })

const newTitle = computed(() => editableTitle.value!==title.value ? <string> editableTitle.value : null )
const sendToMongo = async (html: string, raw: string, extra?: object) => 
  await axios.put('/api/updateNote', {
          title: title.value,
          folderCode: folderCode.value,
          newTitle: newTitle.value,
          html,
          raw,
          extra
        })
        .catch((err) => { console.error(err);
        })

 onBeforeMount(() => {
  getContent()
 })

</script>

<style scoped>
.editable-title {
    border: none;
    font-size: inherit;
    padding-left: 5px;
    width: 100%;
  }
</style>
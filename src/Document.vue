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
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { saveDocument } from '../utils';

const route= useRoute()
const router = useRouter()

const content = ref('')
const title= computed(() => route.params?.document)
const editableTitle = ref(route.params?.document);
const folderCode=computed(() => route.params?.folderCode)

onMounted(() => {
  //title.value= <string>route.params?.document
  editableTitle.value = route.params?.document
  //folderCode.value = route.params?.folderCode  
})

const getContent = () => 
  axios.get('/api/findNoteByTitle', {
    params: {
      folderCode: folderCode.value,
      title: title.value
    }
  })
    .then(res => {
      console.log("resdata"); console.log(res.data);console.log("/Document.vue resdata");
        content.value=res.data?.html ?? res.data?.raw ?? "<strong>Error :</strong> no text found";
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

 onBeforeMount(async () => {
  await getContent()
 })
 
 watch(title, (newValue) => {
  console.log(newValue); console.log(route.params); console.log("/Route params changed - Folder.vue");
  getContent().then(() => { console.log("content updated !")})
  editableTitle.value = newValue
 })

</script>

<style scoped>
.editable-title {
  border: none;
  font-size: inherit;
  padding-left: 5px;
  width: 100%;
}
.main {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
}
</style>
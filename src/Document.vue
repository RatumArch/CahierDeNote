<template>
  <h1><input type="text" placeholder="Titre" class="editable-title" v-model="editableTitle" /></h1>
  <div>
      <div>
        <button type="button" @click="toggleAutoSave" class="auto-save" :class="{disabled: !autoSaveEnabled, onSave: isSaveLoading}" >
          Auto save
        </button>
        <Loader v-if="isLoading" />
      </div>
      <div class="message-server"><pre><strong>Serv : {{messageFromServer}}</strong> </pre> </div>
    </div>
  <div class="main">
    <NoteEditor :content="content" :sendToMongo="sendToMongo" :autoSaveEnabled="autoSaveEnabled" />
  </div>

</template>
y/2
<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { saveDocument } from '../utils';
import Loader from './Loader.vue';

const route= useRoute()
const router = useRouter()
const messageFromServer= ref('')
const isLoading=ref(false)
const isSaveLoading=ref(false)

const content = ref("docuemnt. ddd file rttt")
const title= computed(() => route.params?.document)
const editableTitle = ref(route.params?.document);
const folderCode=computed(() => route.params?.folderCode)

onMounted(async() => {
  //title.value= <string>route.params?.document
  editableTitle.value = route.params?.document
  isLoading.value=true
  await getContent() 
  isLoading.value=false
})

const getContent = () => 
  axios.get('/api/findNoteByTitle', {
    params: {
      folderCode: folderCode.value,
      title: title.value
    }
  })
    .then(res => {
        content.value=res.data?.html ?? res.data?.raw ?? "<strong>Error :</strong> no text found";
        })
    .catch(() => { 
      content.value= "<p><strong>Ereur : </strong> chargement du document</p>"
      })
  
function setMessageServer(msg: string) {
  messageFromServer.value=msg
  const timeout = setTimeout(() => {messageFromServer.value=''; clearTimeout(timeout)}, 5000)
}

const newTitle = computed(() => editableTitle.value!==title.value ? <string> editableTitle.value : null )
async function sendToMongo(html: string, raw: string, extra?: object) { 
  isSaveLoading.value=true
  const updated = 
    await axios.put('/api/updateNote', {
          title: title.value,
          folderCode: folderCode.value,
          newTitle: newTitle.value,
          html,
          raw,
          extra
        })

    updated.status===400 && setMessageServer(updated.data?.message)
    updated.status<400 && newTitle.value && router.replace(newTitle.value);

    isSaveLoading.value=false
    return updated.data
  }


 
 watch(title, async (newValue) => {
  isLoading.value=true
  await getContent()
  editableTitle.value=newValue
  isLoading.value=false
 })

const autoSaveEnabled = ref(true)
async function toggleAutoSave(interval: any) {
  isLoading.value=true
  
  isLoading.value=false
  autoSaveEnabled.value = !autoSaveEnabled.value
}

</script>

<style scoped>
.auto-save {
  background-color: #006400;
  color: white;
  border-radius: 10px;
  padding: 5px;
  border-style: none;
  text-decoration: none;
  letter-spacing: 2px;
  transition: all 0.8s ease-in;
  
}
.auto-save.disabled {
  background-color: lightgray;
  text-decoration: underline;
}
.auto-save.onSave {
  animation-name: auto-save-anim;
  animation-iteration-count: infinite;
  animation-duration: 0.8s;
}
@keyframes auto-save-anim {
  from {
    background: linear-gradient(to right, darkgreen 5%, lightblue);
  }
  25% {
    border-right-width: 5px;
    border-bottom-width: 5px;
    border-top-width: 5px;
    background: linear-gradient(to right, darkgreen 25%, lightblue);
  }
  50% {
    border-bottom-width: 5px;
    border-top-width: 5px;
    background: linear-gradient(to right, darkgreen 50%, lightblue);
  }
  75% {
    border-left-width: 5px;
    border-bottom-width: 5px;
    border-top-width: 5px;
    background: linear-gradient(to right, darkgreen 75%, lightblue);
  }
  from {
    background: darkgreen;
  }
}

.editable-title {
  border: none;
  font-size: inherit;
  padding-left: 5px;
  width: 100%;
}
</style>
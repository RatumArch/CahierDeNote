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
    <NoteEditor :content="content" :sendToMongo="sendToMongo" :autoSaveEnabled="autoSaveEnabled" v-if="isDataLoaded" />
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

const content = ref("write here")
const title= computed(() => route.params?.document)
const editableTitle = ref(route.params?.document);
const folderCode=computed(() => route.params?.folderCode)

const isDataLoaded = ref(false)

onMounted(() => {
  //title.value= <string>route.params?.document
  editableTitle.value = route.params?.document  
})

async function getContent()  {
  isLoading.value=true
  const params = { folderCode: folderCode.value, title: title.value }
  const request = await axios.get('/api/findNoteByTitle', {params})
  const data = request.data
  
  isLoading.value=false
  return data
  }
onMounted(async() => {
  const data = await getContent()
  content.value = data?.html ?? data?.raw ?? "<h2>Error</h2>No content found"
  console.log("document.vue getcontent");console.log(data);console.log(content.value);console.log("/document.vue getcontent")
  if(content.value) {
    isDataLoaded.value = true
  }
})

function setMessageServer(msg: string) {
  messageFromServer.value=msg
  const timeout = setTimeout(() => {messageFromServer.value=''; }, 5000)
}

const newTitle = computed(() => editableTitle.value!==title.value ? <string> editableTitle.value : null )
const sendToMongo = async (html: string, raw: string, extra?: object) => { 
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

    if(!updated.data) {
      isLoading.value=false
    }
    updated.status>=400 && setMessageServer(updated.statusText)
    updated.status<400 && newTitle.value && router.replace(newTitle.value);

    isSaveLoading.value=false
    return updated.data
  }


 
 watch(title, async (newValue) => {
  isLoading.value=true
  const request= await getContent()
  content.value= await request.data?.html ?? "nno content from watcher"
  console.log(content.value);console.log("/document.vue watcher");
  editableTitle.value=newValue
  isLoading.value=false
 })

const autoSaveEnabled = ref(true)
async function toggleAutoSave(interval: any) {
  isLoading.value=true
  const data = await getContent()
  console.log(data);console.log("/toggleAutoSave - Document.vue");
  isLoading.value=false
  autoSaveEnabled.value = !autoSaveEnabled.value
  content.value = "<h2>Chganjge !!!!!!!!!!!!!!!!!!!!!!!!</h2>GJJJJJJJJGJJGJGJG"
}

</script>

<style scoped>
.auto-save {
  background-color: #006400;
  color: white;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding: 7px;
  border-style: none;
  text-decoration: none;
  letter-spacing: 2px;
  transition: all 0.8s ease-in;
  cursor: pointer;  
}
.auto-save.disabled {
  background-color: lightgray;
  text-decoration: underline;
  animation: none;
}
.auto-save.onSave {
  animation-name: auto-save-anim;
  animation-iteration-count: infinite;
  animation-duration: 0.8s;
}
@keyframes auto-save-anim {
  from {
    background: linear-gradient(to right, darkgreen 75%, lightblue);
  }
  25% {
    border-bottom-width: 2px;
    border-style: solid;
    border-color: blueviolet;
    background: linear-gradient(to right, darkgreen 50%, lightblue);
  }
  50% {
    border-bottom-width: 2px;
    border-style: solid;
    border-color: blueviolet;
    background: linear-gradient(to right, darkgreen 25%, lightblue);
  }
  75% {
    border-bottom-width: 2px;
    border-style: solid;
    border-color: blueviolet;
    background: linear-gradient(to right, darkgreen 10%, lightblue);
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
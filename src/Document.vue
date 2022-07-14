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
    <NoteEditor :content="content"
                :sendToMongo="sendToMongo"
                :autoSaveEnabled="autoSaveEnabled"
                :savingTriggered="savingTriggered"
                @contentSaved="updateContent"
                @writed="updateContentRef"
                v-if="isDataLoaded" />
  </div>

</template>

<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { saveDocument } from '../utils';
import Loader from './Loader.vue';

const route= useRoute()
const router = useRouter()
const messageFromServer= ref('')
const isLoading=ref(false)
const isSaveLoading=ref(false)
const savingTriggered= ref(false)

const content = ref("ppp")
const title= computed(() => route.params?.document)
const editableTitle = ref(route.params?.document);
const folderCode=computed(() => route.params?.folderCode)

const isDataLoaded = ref(false)


async function getContent(folderCode: string, title: string)  {
  isLoading.value=true
  const params = { folderCode, title }
  const request = await axios.get('/api/findNoteByTitle', {params})
  const data = request.data
  
  isLoading.value=false
  return data
  }

function setMessageServer(msg: string) {
  messageFromServer.value=msg
  const timeout = setTimeout(() => {messageFromServer.value=''; }, 5000)
}
const logg = () => { console.log("Documentv - event received")}
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

    if(!updated.data || updated.status>=400) {
      isSaveLoading.value=false
      setMessageServer(updated.statusText)
    }
    
    if(updated.status<400 && newTitle.value) router.replace(newTitle.value);

    isSaveLoading.value=false
    return updated.data
  }


const autoSaveEnabled = ref(true)
async function toggleAutoSave() {
  autoSaveEnabled.value = !autoSaveEnabled.value
  console.log(title.value);console.log("/toggler title.value");
  // @ts-ignore
  const data = await getContent(folderCode.value, title.value)
  
  console.log(data);console.log("/toggleAutoSave - Document.vue");
  content.value = data?.html ?? "Auto save mal togglé"
}

onMounted(async () => {
  console.log(route.params);console.log(route.params?.document ?? "no param document - mounted")
    if(route.params?.document?.length>0) {
      console.log("dans if - mounted")
      console.log(route.params);console.log(route.params?.document ?? "no param document - mounted")

      const data = await getContent(<string>folderCode.value, <string>route.params?.document)
      content.value = data?.html ?? data?.raw ?? "<h2>Error</h2>No content found on Mounted"
      editableTitle.value=route.params?.document; console.log(data);console.log("/ getcontent loaded - mounted");
      isDataLoaded.value = true 
    }
    
})
onBeforeRouteUpdate(async (to, from) => {
  editableTitle.value=to.params?.document
  isDataLoaded.value=false
  const data = await getContent(<string>folderCode.value, <string>to.params?.document)
  savingTriggered.value=true;console.log(data);console.log("/ getcontent loaded - onBeforeRouteUpdate");
  content.value = data?.html ?? data?.raw ?? "<h2>Error</h2>No content found"
  
  savingTriggered.value=false
  
  isDataLoaded.value = true
  console.log("document.vue getcontent");console.log(data);console.log(content.value);console.log("/document.vue getcontent")

})
const updateContent = async () => {
  const data = await getContent(<string>folderCode.value, <string>route.params?.document)
  content.value = data?.html ?? "updated after event received"
}

const updateContentRef = (html: string, raw?: string) => { content.value=html; console.log("/updateContentRef - Documentv") }

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
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: blueviolet;
    background: linear-gradient(to right, darkgreen 50%, lightblue);
  }
  50% {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: blueviolet;
    background: linear-gradient(to right, darkgreen 25%, lightblue);
  }
  75% {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: blueviolet;
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
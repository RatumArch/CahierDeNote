<template>
  <h1><input type="text" placeholder="Titre" class="editable-title" v-model="editableTitle" /></h1>
  <div>
      <div >
        <button type="button" @click="toggleAutoSave" class="auto-save" :class="{disabled: !autoSaveEnabled, onSave: isSaveLoading}" >
          Auto save
        </button>
        <input type="checkbox" id="checkbox-off" v-model="isOfflineEnabled" /><label for="checkbox-off">Offline</label>
        <input type="checkbox" id="checkbox-sync" /><label for="checkbox-sync">Sync</label>
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
import { getContent, saveDocument } from '@/utils/request.ts';
import { MSG } from './constants';
import Loader from './Loader.vue';

const emit = defineEmits(['titleChanged'])

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

const isOfflineEnabled=ref(false)


function setMessageServer(msg: string) {
  messageFromServer.value=msg
  const timeout = setTimeout(() => {messageFromServer.value=''; }, 5000)
}

const newTitle = computed(() => editableTitle.value!==title.value ? <string> editableTitle.value : null )
const sendToMongo = async (html: string, raw: string, extra?: object) => { 
  isSaveLoading.value=true

  // @ts-ignore
  const updated = await saveDocument(route.params.document, folderCode.value, html, raw, newTitle.value, extra)

  if(!updated.data || updated.status>=400) {
    isSaveLoading.value=false
    setMessageServer(updated.statusText)
  }
  
  if(updated.status<400 && newTitle.value)
  {
    emit('titleChanged', newTitle.value)
    router.replace(newTitle.value);
  } 

    isSaveLoading.value=false
    return updated.data
}


const autoSaveEnabled = ref(true)
async function toggleAutoSave() {
  autoSaveEnabled.value = !autoSaveEnabled.value
  
  // @ts-ignore
  const data = await getContent(folderCode.value, title.value)
  
  content.value = data?.html ?? MSG.ERROR.AUTO_SAVE
}

onMounted(async () => {
    if(route.params?.document?.length>0) {
      isLoading.value=true
      const data = await getContent(<string>folderCode.value, <string>route.params?.document)
      content.value = data?.html ?? data?.raw ?? MSG.ERROR.NO_CONTENT_EDITOR
      editableTitle.value=route.params?.document;
      isLoading.value=false
      isDataLoaded.value = true 
    }
    
})
onBeforeRouteUpdate(async (to, from) => {  
  isDataLoaded.value=false
  isLoading.value=true
  const data = await getContent(<string>folderCode.value, <string>to.params?.document)
  isLoading.value=false
  savingTriggered.value=true;console.log(data);console.log("/ getcontent loaded - onBeforeRouteUpdate");
  content.value = data?.html ?? data?.raw ?? MSG.ERROR.NO_CONTENT_EDITOR
  editableTitle.value= data?.title ?? to.params?.document
  savingTriggered.value=false
  
  isDataLoaded.value = true
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
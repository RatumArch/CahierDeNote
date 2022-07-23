<template>
  <h1><input type="text" placeholder="Titre" class="editable-title" v-model="editableTitle" /></h1>
  <div>
      <div >
        <button
          type="button" 
          @click="toggleAutoSave"
          class="auto-save"
          :class="{disabled: !autoSaveEnabled, onSave: isSaveLoading && autoSaveEnabled }"
          :aria-checked="autoSaveEnabled" >
          {{BUTTON.AUTO_SAVE[lang]}}
        </button>
        <div>
          <input type="checkbox" id="checkbox-off" v-model="isOfflineEnabled" /><label for="checkbox-off">Offline</label>
        </div>
        <div v-if="isStandAlone" >
          <input type="checkbox" id="checkbox-sync" /><label for="checkbox-sync">Sync</label>
        </div>
        <Loader v-if="isLoading" />
      </div>
      <div class="message-server"><h2> {{messageAfterRequest}} </h2> </div>
    </div>
  <div class="main">
    <NoteEditor :content="content"
                :sendToMongo="sendToMongo"
                :autoSaveEnabled="autoSaveEnabled"
                :savingTriggered="savingTriggered"
                @contentSavedManually="updateContent"
                @writed="updateContentRef"
                v-if="isDataLoaded" />
  </div>

</template>

<script setup>
import NoteEditor from '@/components/NoteEditor.vue';
import axios from 'axios'
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { getContent, saveDocument } from '@/utils/request.ts';
import { useLang } from '@/utils/lang.ts'
import { BUTTON, MSG } from './constants';
import Loader from './Loader.vue';

const emit = defineEmits(['titleChanged'])

const route= useRoute()
const router = useRouter()
const messageAfterRequest= ref('')
const isLoading=ref(false)
const isSaveLoading=ref(false)
const savingTriggered= ref(false)

const content = ref("ppp")
const title= computed(() => route.params?.document)
const editableTitle = ref(route.params?.document);
const folderCode=computed(() => route.params?.folderCode)

const isDataLoaded = ref(false)

const isOfflineEnabled=ref(false)
const lang=useLang()
// @ts-ignore
const LOCAL_MSG = computed(() => MSG[lang.value]);
console.log(lang.value);

// Si l'appli est lancé depuis le bureau
const isStandAlone=ref( window.matchMedia('(display-mode: standalone)').matches )


const newTitle = computed(() => editableTitle.value!==title.value ? editableTitle.value : null )
const sendToMongo = async (html, raw, extra=null) => { 
  isSaveLoading.value=true

  // @ts-ignore
  const updated = await saveDocument(route.params.document, folderCode.value, html, raw, newTitle.value, extra)

  if(!updated.data || updated.status>=400) {
    isSaveLoading.value=false
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
  
  content.value = data?.html ?? LOCAL_MSG.value.ERROR.AUTO_SAVE
}

onMounted(async () => {
    if(route.params?.document?.length>0) {
      isLoading.value=true
      const data = await getContent(folderCode.value, route.params?.document)
      content.value = data?.html ?? data?.raw ?? LOCAL_MSG.value.ERROR.NO_CONTENT_EDITOR
      editableTitle.value=route.params?.document;
      isLoading.value=false
      isDataLoaded.value = true 
    }
    
})
onBeforeRouteUpdate(async (to, from) => {  
  isDataLoaded.value=false
  isLoading.value=true
  const data = await getContent(folderCode.value, to.params?.document)
  isLoading.value=false
  savingTriggered.value=true;
  content.value = data?.html ?? data?.raw ?? LOCAL_MSG.value.ERROR.NO_CONTENT_EDITOR
  editableTitle.value= data?.title ?? to.params?.document
  savingTriggered.value=false
  
  isDataLoaded.value = true
})
const updateContent = async () => {
  messageAfterRequest.value='Saving...'
  const data = await getContent(folderCode.value, route.params?.document)
  content.value = data?.html ?? "UpdateContent failed"
  messageAfterRequest.value='Saved !'; setTimeout(() => messageAfterRequest.value='', 2000)
}

const updateContentRef = (html, raw=null) => { 
  content.value=html;
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
<template>
  <h1><input type="text" placeholder="Titre" class="editable-title" v-model="editableTitle" /></h1>
  <div class="main">
    <NoteEditor :content="content" :sendToMongo="sendToMongo" :autoSaveEnabled="autoSaveEnabled"  />

    <div>
      <Transition name="button-save">
        <div>
          <button @click="toggleAutoSave" class="auto-save" :class="{disabled: !autoSaveEnabled}" >Auto save {{ autoSaveEnabled ? 'enabled' : 'disabled' }}</button>
        </div>
      </Transition>
      <div class="message-server"><pre><strong>{{messageFromServer}}</strong> </pre> </div>
    </div>
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
const messageFromServer= ref('')

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

    return updated.data
  }

 onBeforeMount(async () => {
  await getContent()
 })
 
/*  watch(title, async (newValue) => {
  await getContent()
  editableTitle.value = newValue
 })
 */
const autoSaveEnabled = ref(true)
function toggleAutoSave(interval: any) {
  autoSaveEnabled.value = !autoSaveEnabled.value
}

</script>

<style scoped>
.auto-save {
  background-color: #006400;
  color: white;
  border-radius: 10px;
  padding: 2px;
  border-style: none;
  text-decoration: none;
}
.auto-save .disabled {
  background-color: lightgray;
  text-decoration: underline;
}
.button-save-enter-active {
  transition: all 0.5s ease-out;
}
.editable-title {
  border: none;
  font-size: inherit;
  padding-left: 5px;
  width: 100%;
}
.main {
  display: flex;
  flex-direction: row;
}
</style>
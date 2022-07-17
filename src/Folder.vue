<template>
<div class="container">
  
  <div class="sidebar">
    <RouterLink to="/" class="accueil" >{{ SIDEBAR.ACCUEIL[lang]}}</RouterLink>
    <div title="Copy this link to retrieve your folder later" class="copy" @click="copy" >
      <font-awesome-icon icon="fa-solid fa-clipboard" />
      {{folderCode}}
      <pre>{{copiedMsg}}</pre>
    </div>
    <button @click="newDocument">
      <font-awesome-icon icon="fa-solid fa-add" /> New note
    </button>

    <RouterLink :to="{name: 'document', 
                params: {document: note?.title, folderCode: folderCode } }" 
                v-for="note of notesContent" :key="note?.title"
                class="document-link"
                :title="note?.title"
                >
        {{note?.title}}
    </RouterLink>

    <span class="document-link" v-if="isNewNoteLoading">New Note incomming... <progress /> </span>
  </div>

  <div class="main">
    <RouterView v-if="notesContent[0]?.title" v-slot="{Component}" @titleChanged="handleTitleChange">
    <Transition name="documents">
      <component :is="Component"/>
    </Transition>
    </RouterView>
  </div>
</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import Loader from './Loader.vue';
import { createDocument, findNotes, useLang } from './utils';
//import { useLang } from '@/utils/lang.ts'
import { SIDEBAR } from './constants';


const notesContent = ref(['init-value'])

const route = useRoute()
const router = useRouter()
const isNewNoteLoading = ref(false)

const folderCode = computed(() => route.params?.folderCode)

const lang=useLang()

const copiedMsg=ref('')
const copy = () =>
  navigator.clipboard.writeText(window.location.href)
    .then(() => { copiedMsg.value='copied'; setTimeout(() => copiedMsg.value='', 2000) })
    .catch((err) => { copiedMsg.value='fail to copy' })


const findNotesFromFolder = async () => await findNotes(folderCode.value)

async function newDocument() {
  isNewNoteLoading.value=true
  const newDoc = await createDocument(folderCode.value)

  notesContent.value= await findNotesFromFolder()
  isNewNoteLoading.value=false
  
  newDoc?.title ? router.push(`${newDoc.title}`) : router.replace('/error')
}

async function handleTitleChange(newTitle) {
  notesContent.value= await findNotesFromFolder()
}

onBeforeMount(async () => {
  isNewNoteLoading.value=true
  notesContent.value= await findNotesFromFolder()
  isNewNoteLoading.value=false
  const document = notesContent.value[0]
  
  const routeDocument = route.params?.document?.length>0 ? route.params?.document : document?.title;

  router.push(`/folder/${folderCode.value}/${routeDocument}`);  
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 97vh;
  gap: 10px;
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: lightgray;
}
.main {
  padding-right: 5vh;
  width: 80%;
  
  .documents-enter-active {
    transition: all 0.3s ease-out;
    height: 50%;
  }
  .documents-enter-to {
    height: 70%;
    opacity: 1;
  }
  .documents-enter-from {
    height: 10%;
    opacity: 0;
  }
}
.sidebar {
  background-color: darkgreen;
  display: flex;
  flex-direction: column;
  width: 15%;
  height: inherit;
  padding: 10px;
  color: white;
  overflow-y: auto;

  letter-spacing: 2px;
  overflow-x: hidden;

  .accueil {
    font-weight: bold;
    color: white;
    font-size: 3vh;
    margin-bottom: 20px;
  }
  button {
    margin-bottom: 10px;
  }
  .copy {
    margin-bottom: 20px;
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
  .document-link {
    color: white;
    text-decoration: none;
    margin-bottom: 10px;
    
    &:hover, &:focus {
      text-decoration: underline;
    }
  }
  
}
</style>
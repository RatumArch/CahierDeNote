<template>
<div class="container">
  
  <div class="sidebar">
    <RouterLink to="/" class="accueil" >Accueil</RouterLink>
    <div title="Copy this link to retrieve your folder later" class="copy" @click="copy" >
      <font-awesome-icon icon="fa-solid fa-clipboard" />
      {{folderCode}}
      <pre>{{copiedMsg}}</pre>
    </div>
    <button @click="createDocument">
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

  </div>

  <div class="main">
    <RouterView v-if="notesContent[0]?.title" v-slot="{Component}">
    <Transition name="documents">
      <component :is="Component"/>
    </Transition>
    </RouterView>
  </div>
</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import Loader from './Loader.vue';
import { computed } from '@vue/reactivity';


const notesContent = ref(['rrien'])
const title= ref('error')
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

const folderCode = computed(() => route.params?.folderCode)


const copiedMsg=ref('')
const copy = () =>
  navigator.clipboard.writeText(window.location.href)
    .then(() => { copiedMsg.value='copied'; setTimeout(() => copiedMsg.value='', 2000) })
    .catch((err) => { copiedMsg.value='fail to copy' })


const findNotesFromFolder = async () =>
  await axios.get('/api/findNotesFromFolder', {
      params: {
        folderCode: folderCode.value ?? "no-folder-code"
      }
    })
      .then(res => res.data)
      .catch(() => null)

  async function createDocument() {

    const newDoc = await axios.post('/api/createDocument', { folderCode: folderCode.value }).then(doc => doc.data)
    
    notesContent.value= await findNotesFromFolder()
    
    newDoc?.title ? router.push(`${newDoc.title}`) : router.replace('/error')
  }

onBeforeMount(async () => {
  isLoading.value=true
  notesContent.value= await findNotesFromFolder()
  
  const document = notesContent.value[0]
  console.log(notesContent.value);
  title.value= document?.title;

  router.push(`/folder/${folderCode.value}/${title.value}`);  
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
  width: 85%;
  
  .documents-enter-active {
    transition: all 0.3s ease-out;
    height: 50%;
  }
  .documents-enter-to {
    height: 70%;
  }
  .documents-enter-from {
    height: 10%;
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

  letter-spacing: 2px;
  overflow: hidden;

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
<template>
<div class="container">
  
  <div class="sidebar">
    <RouterLink to="/" class="accueil" >Accueil</RouterLink>
    <div title="save this code to retrieve your folder later" class="copy" @click="copy" >
      <font-awesome-icon icon="fa-solid fa-clipboard" />
      {{folderCode}}
      <pre>{{copiedMsg}}</pre>
    </div>
    <button @click="createDocument">
      <font-awesome-icon icon="fa-solid fa-add" /> New note
    </button>
<Loader v-if="isLoading"/>
    <RouterLink :to="{name: 'document', 
                params: {document: note?.title, folderCode: folderCode } }" 
                v-for="note of notesContent" :key="note.id"
                class="document-link"
                :title="note?.title"
                >
        {{note?.title}}
    </RouterLink>

  </div>

  <div class="main">
    <RouterView />
  </div>
</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import Loader from './Loader.vue';


const folderData = ref(null)
const notesContent = ref(null)
const title= ref('error')
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

const folderCode = ref('')
folderCode.value= route.params?.folderCode

const copiedMsg=ref('')
const copy = () =>
  navigator.clipboard.writeText(window.location.href)
    .then(() => { console.log(`copied ${route.fullPath}`); console.log(import.meta.env.url) ;copiedMsg.value='copied'; setTimeout(() => copiedMsg.value='', 2000) })
    .catch((err) => { console.log(`NON copied`); console.error(err); console.error(route.fullPath)})


const findFolder = async () =>
  await axios.get('/api/findFolder', {
      params: {
        folderCode: folderCode.value
      }
    })
      .then(res => res.data)
      .catch(() => null)

  async function createDocument() {

    const newDoc = await axios.post('/api/createDocument', { folderCode: folderCode.value }).then(doc => doc.data)
    
    notesContent.value= await findFolder()
    
    newDoc?.title ? router.push(`${newDoc.title}`) : router.replace('/error')
  }

onMounted(async () => {
  isLoading.value=true
  notesContent.value= await findFolder()  
  
  const document = notesContent.value[0]
  
  title.value= document?.title 
  if(!notesContent.value) {
    isLoading.value=false
    throw "requête findFolder raté - Foldervue"
  }
  notesContent.value&&title.value ? router.push(`${folderCode.value}/${title.value}`) : router.replace('/error')
  isLoading.value=false
})
onUpdated(() => {
  findFolder().then(() => { console.log("folder updated")})
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
<template>
<div class="container">
  
  <div class="sidebar">
    <RouterLink to="/" class="accueil" >Accueil</RouterLink>
    <button @click="createDocument">
      <font-awesome-icon icon="fa-solid fa-add" /> New note
    </button>

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
    <RouterView :key="note.id" />
  </div>
</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { onBeforeMount, onMounted, ref } from 'vue';


const folderData = ref(null)
const notesContent = ref(null)
const title= ref('error')
const route = useRoute()
const router = useRouter()

const folderCode = ref('')
folderCode.value= route.params?.folderCode


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
    
    folderData.value= await findFolder()
    notesContent.value= folderData.value
    console.log(title.value);console.log(notesContent.value);console.log("/notes content")
    const document = notesContent.value?.[0]
    title.value= document?.title 
    
    folderData.value&&title.value ? router.push(`${title.value}`) : router.replace('/error')
    console.log(route.params);console.log("/Route params - Folder.vue");
  }

onBeforeMount(async () => {
  folderData.value= await findFolder()
  
  notesContent.value= folderData.value
  //console.log(notesContent.value);
  const document = notesContent.value[0]
  title.value= document?.title 
  
  folderData.value&&title.value ? router.replace(`${folderCode.value}/${title.value}`) : router.replace('/error')
})

onMounted(() => {
  console.log("route loaded")
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 97vh;
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
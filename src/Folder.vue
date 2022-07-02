<template>
<div class="container">
  <div class="sidebar">
    <RouterLink to="/" ><h1>Accueil</h1></RouterLink>
    <div class="content-sidebar">
      <RouterLink :to="{name: 'document', 
                  params: {document: note?.title, folderCode: folderCode } }" 
                  v-for="note of notesContent" :key="note.id"
                  class="document-link"
                  :title="note?.title"
                  >
          {{note?.title}}
      </RouterLink>
    </div>
  </div>
  <div class="main">
    <RouterView/>
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

const findLastNote = async () =>
  await axios.get('/api/findLastNote', {
      params: {
        folderCode: folderCode.value
      }
    })
    .then(res => res.data)
    .catch(res => null)

const findFolder = async () =>
  await axios.get('/api/findFolder', {
      params: {
        folderCode: folderCode.value
      }
    })
      .then(res => res.data)
      .catch(() => null)

onBeforeMount(async () => {
  folderData.value= await findFolder()
  console.log(folderData.value);console.log("/folder data - Folder.vue");
  notesContent.value= folderData.value?.notesContent ?? [5,4]
  console.log(notesContent.value);console.log("/notesContent.value - Folder.vue");
  const document = notesContent.value[0]
  title.value= document?.title ?? 'rr'
  
  folderData ? router.replace(`${folderCode.value}/${title.value}`) : router.push('/error')
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
}
.main {

  padding-right: 5vh;
  width: 100%;
}
.sidebar {
  background-color: darkgreen;
  display: flex;
  width: 15%;
  height: inherit;
  padding: 10px;
  color: white;

  &.content-sidebar {
    position: fixed;
    letter-spacing: 2px;
    overflow: hidden;

    .document-link {
      color: white;
      text-decoration: none;
      
      &:hover, &:focus {
        text-decoration: underline;
      }
    }
  }
}
</style>
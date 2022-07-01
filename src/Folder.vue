<template>
<div class="container">
  <div class="sidebar">
    <div class="content-sidebar">
      <p v-for="note of notesContent" :key="note.id">{{note?.title}}</p>
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
const route = useRoute()
const router = useRouter()

const findLastNote = async () =>
  await axios.get('/api/findLastNote', {
      data: {
        folderCode: route.params?.folderCode
      }
    })
    .then(res => res.data)
    .catch(res => null)

const findFolder = async () =>
  await axios.get('/api/findFolder', {
      data: {
        folderCode: route.params?.folderCode
      }
    })
      .then(res => res.data)
      .catch(() => null)

onBeforeMount(async () => {
  folderData.value= await findFolder()
  notesContent.value= folderData.value?.notesContent
})

onMounted(async ()=> {
  const document = notesContent.value[0]
  const title= document?.title
  router.replace(title)
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-evenly;
  min-height: 90vh;
}
.main {

  padding-right: 5vh;
  width: 100%;
}
.sidebar {
  background-color: darkgreen;
  display: flex;
  width: 10%;
  height: 100vh;
  padding: 10px;
  color: white;

  &.content-sidebar {
    position: fixed;
  }
}
</style>
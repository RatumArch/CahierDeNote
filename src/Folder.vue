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
import { onMounted, ref } from 'vue';
import router from './router';

const folderData = ref(null)
const notesContent = ref(null)
const route = useRoute()
console.log(route.params?.folderCode);
const findLastNote = async () =>
  await axios.get('/api/findLastNote', {
      data: {
        folderCode: route.params?.folderCode
      }
    })
    .then(res => res.data)
    .catch(res => null)

const folder = 
  await axios.get('/api/findFolder', {
      data: {
        folderCode: route.params?.folderCode
      }
    })
      .then(res => res.data)
      .catch(() => null)

notesContent.value= folder?.notesContent

onMounted(()=> {
  findLastNote()
    .then(document => {
      router.push(`${document?.title}`)
    })
  console.log(route.params);
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
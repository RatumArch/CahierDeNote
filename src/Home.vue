<template>
  <div class="home">
    <ReloadPWA />
  <a class="link newdoc" @click="createFolder">
    New Document
  </a>
  <RouterLink :to="`/folder/${folderCode}`" class="link load-doc">
    Load document from folder code
  </RouterLink><input type="text" v-model="folderCode"/>
  <!-- <NoteEditor content="fjk" title="test"/> -->
  </div>
  <button class="link" @click="purge" >{{purged}}</button>
  <NoteEditor content="<p>III</p>" />
</template>

<script setup lang="ts">
import { ref } from "vue";

import ReloadPWA from "./components/ReloadPWA.vue";

import NoteEditor from "./components/NoteEditor.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";


const cloudName = 'dzggewhvt'
const onSubmit = (e: any) => {
  const cloudName = 'dzggewhvt'
  axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    file: e.target.value,
    upload_preset: 'ze5mrykg'
      } ).then(res => { console.log(res.data);
      })
}

const folderCode = ref('')
const router = useRouter()

const createFolder = async () => {
  const newFolder = 
    await axios.post('/api/createFolder')
      .then(res => res.data).catch(() => null)
      
  folderCode.value=newFolder?.folderCode ?? 'error'
  //const documentTitle = newFolder?.notesContent[0]?.title ?? 'noDocument'
  newFolder ? router.push(`/folder/${folderCode.value}`) : router.push('/error')
}

const purged = ref('purge')
const purge = () => axios.delete('/api/purge').then(() => { purged.value = "Purged" })

</script>

<style scoped lang="scss">
.home {
  padding: 10%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.link {
  text-decoration: double;
  color: black;
  padding: 20px;
  border-radius: 10px;
  letter-spacing: 2px;
  width: 60%;

  &:hover, &:focus {
    text-decoration: underline;
    cursor: pointer;
  }

  &.newdoc {
    display: block;
    margin-bottom: 50px;
    font-size: 5vw;
    text-align: center;
    border-style: solid;
    border-color: royalblue;
  }
  &.load-doc {
    background-color: lightblue;
    font-size: 4vw;
    text-align: center;
  }
}
input {
      display: inline;
      font-size: 4vw;
      padding: 2vw;
      width: 20ex;
      height: 30px;
}
</style>
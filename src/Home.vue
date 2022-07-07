<template>
  <div class="home">
    <ReloadPWA v-if="isDev" />
  <a class="link newdoc" @click="createFolder">
    New Document
  </a>
  <RouterLink :to="`/folder/${folderCode}`" class="link load-doc">
    Load document from folder code
  </RouterLink><input type="text" v-model="folderCode"/>
  
  </div>
  <button class="link" @click="purge" >{{purged}}</button>
  <NoteEditor content="<pre>au pré  du </pre>" :auto-save-enabled="false" v-if="isDev" />
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import ReloadPWA from "./components/ReloadPWA.vue";

import NoteEditor from "./components/NoteEditor.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const folderCode = ref('')
const router = useRouter()
const route = useRoute()
const isLoading=ref(false)

const createFolder = async () => {
  isLoading.value=true
  const newFolder = 
    await axios.post('/api/createFolder')
      .then(res => res.data).catch(() => null)
  
  folderCode.value=newFolder?.folderCode ?? 'error'
  isLoading.value=false
  newFolder ? router.push(`/folder/${folderCode.value}`) : router.push('/error')
}

onMounted(() => {
  const paramFolder = route.params?.folderCode
  console.log("Homevu")
  const paramsTitle = route.params?.document ?? ''
  console.log(route.params); console.log(typeof route.params?.document)
  const isParamFolder = paramFolder?.length>0
  const isParamTitle: boolean = paramsTitle?.length > 0;

  (isParamFolder && isParamTitle) && router.push(`/folder/${paramFolder}/${paramsTitle}`);
  (isParamFolder && !isParamTitle) && router.push(`/folder/${paramFolder}`);
  (!isParamFolder && !isParamTitle) && console.log("rester là")
})

const purged = ref('purge')
const purge = () => axios.delete('/api/purge').then(() => { purged.value = "Purged" })
const isDev = ref(import.meta.env.DEV)

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
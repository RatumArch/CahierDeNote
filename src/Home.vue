<template>
  <div class="home">
    <ReloadPWA v-if="isDev" />
    <Teleport to="header.description">
  <div class="description">
    <div class="title">
      <h1>{{HOME_L.TITLE }}</h1>
      <p>{{HOME_L.DESCRIPTION}}</p>
    </div>
    <h2>Features</h2>
    <ul>
      <li>Images</li>
      <li>LaTex expression</li>
      <li>{{HOME_L.AUTO_SAVE}}</li>
      <li>Installable</li>
    </ul>
  </div>
  </Teleport>
  <div tabindex="0" class="link newdoc" @click="createFolder">
    {{HOME_L.NEW_DOC}}
  </div>
  <div class="load-doc" >
    <RouterLink :to="`/folder/${folderCode}`" tabindex="0" class="link load-doc" >
      {{HOME_L.LOAD_FOLDER}}
    </RouterLink>
    <input type="text" v-model="folderCode"/>
  </div>

  <progress v-if="isLoading" />
  </div>
  <button class="link" @click="purge" >{{purged}}</button>
  <NoteEditor content="===" :auto-save-enabled="false" v-if="isDev" :saving-triggered="false" />
  
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import ReloadPWA from "./components/ReloadPWA.vue";

import NoteEditor from "./components/NoteEditor.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Loader from "./Loader.vue";
import { HOME } from "@/constants/index.ts";
import type { indexLang, textLang } from "@/constants/types.ts"

const folderCode = ref('')
const router = useRouter()
const route = useRoute()
const isLoading=ref(false)
// @ts-ignore
const lang=ref<indexLang>('fr')
// @ts-ignore
let tem
const HOME_L = computed(() => HOME[lang.value])

const createFolder = async () => {
  isLoading.value=true
  const newFolder = 
    await axios.post('/api/createFolder')
      .then(res => res.data).catch(() => null)
  
  folderCode.value=newFolder?.folderCode ?? 'error'
  isLoading.value=false
  newFolder ? router.push(`/folder/${folderCode.value}`) : router.push('/error')
}



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
.description {
  background-color: darkgreen;
  padding-top: 5px;  
  color: white;
  font-size: 3vh;
  padding: 13px;

  .title {
    text-align: center;
  }
  ul {
    line-height: 1.5em;
  }
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
.load-doc {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  input {
      display: inline;
      font-size: 4vw;
      padding: 2vw;
      width: 10ex;
      height: 30px;
}
}

</style>
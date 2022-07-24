<template>
  <div class="home">
    <ReloadPWA v-if="isDev" />
    <Teleport to="header.description">
    <div class="description">
      <div class="title">
        <h1>{{HOME_TYPED.TITLE[lang] }}</h1>
        <p>{{HOME_TYPED.DESCRIPTION[lang]}}</p>
      </div>
      <h2>Features</h2>
      <ul>
        <li>Images</li>
        <li>LaTex expression</li>
        <li>{{HOME_TYPED.AUTO_SAVE[lang]}}</li>
      </ul>
      <ReloadPWA/>
    </div>
    </Teleport>
    <div tabindex="0" class="link newdoc" @click="newFolder">
      {{HOME_TYPED.NEW_DOC[lang] }}
    </div>
    <progress v-if="isLoading" />
    <div class="load-doc" >
      <input type="text" v-model="folderCode"/>
      <RouterLink :to="`/folder/${folderCode}`" tabindex="0" class="link load-doc" >
        {{HOME_TYPED.LOAD_FOLDER[lang] }}
      </RouterLink>
    </div>

  </div>
  <NoteEditor :content="content" :auto-save-enabled="false" :saving-triggered="false" v-if="content?.length>0" />
  
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeMount, onMounted, ref } from "vue";

import ReloadPWA from "./components/ReloadPWA.vue";



import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Loader from "./Loader.vue";
// @ts-ignore
import { HOME, ROUTE } from "@/constants";
import { createFolder } from "./utils/request.ts";
import type { textLang } from "./constants/types";
import { useLang } from '@/utils/hooks'

const NoteEditor = defineAsyncComponent({ loadingComponent: () => import('./components/NoteEditor.vue'), loader: () => import('./Loader.vue') })

const folderCode = ref('')
const router = useRouter()
const route = useRoute()
const isLoading=ref(false)
// @ts-ignore
const lang=useLang()
const HOME_TYPED=ref<textLang>(HOME)
const HOME_TYPED2=computed<textLang>(() => HOME)

const content=ref('')

onBeforeMount(async () => {
  content.value= await axios.get('/api/findExemple').then(res => res.data)
})


const newFolder = async () => {
  isLoading.value=true
  const newFolder = await createFolder().catch(() => null)
  
  folderCode.value=newFolder?.folderCode ?? 'error'
  isLoading.value=false
  newFolder ? router.push(`/${ROUTE.FOLDER}/${folderCode.value}`) : router.push(ROUTE.ERROR)
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
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 3vh;
  input {
      display: inline;
      font-size: 4vw;
      padding: 2vw;
      width: 10ex;
      height: 30px;
}
}
.exemples {
    width: 60vw;
    font-size: 5vh;
    border-top-style: solid;
    
    img {
      width: 100%;
    }
  }

</style>
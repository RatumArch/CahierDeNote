<template>
  <header class="description"></header>
  <main>
  <RouterView  >
  </RouterView>
  <div id="exemples"></div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReloadPWA from "./components/ReloadPWA.vue";
import { RouterView, RouterLink } from "vue-router";
import ImageInp from "./components/ImageInput.vue";
import NoteEditor from "@/components/NoteEditor.vue";
import Loader from './Loader.vue'
export default defineComponent({
  name: "App",
  components: {
    NoteEditor,
    ReloadPWA,
    Loader,
    RouterView,
    RouterLink
  },
 
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0px
}
</style>

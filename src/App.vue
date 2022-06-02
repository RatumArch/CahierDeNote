<template>
  <ReloadPWA />

  <NoteEditor/>
</template>

<script lang="ts">
import ImageInput from "./components/ImageInput.vue"


import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import ReloadPWA from "./components/ReloadPWA.vue";
import PicInput from "./components/PicInput.vue"
import ImageInp from "./components/ImageInput.vue";
import NoteEditor from "./components/NoteEditor.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    NoteEditor,
    ReloadPWA,
    PicInput,
    ImageInp,
    ImageInput
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  min-height: 600px;
}

</style>

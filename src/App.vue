<template>
  <ReloadPWA />

  <ImageInput name="plpk" textPlaceholder="Ouroboros" class="dde" />
</template>

<script lang="ts">
import {ImageInput} from "vue3-image-input"


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
@import '/node_modules/vue3-image-input/dist/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.dde {
  width: 200px;
}
</style>

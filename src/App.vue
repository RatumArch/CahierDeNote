<template>
  <ReloadPWA />
  <TextNode template="<h3>A text node </h3>" >+</TextNode>

  <NoteEditor/>
</template>

<script lang="ts">
import ImageInput from "./components/ImageInput.vue"
import TextNode from './components/TextNode.vue'
import { defineComponent } from "vue";
import ReloadPWA from "./components/ReloadPWA.vue";

import ImageInp from "./components/ImageInput.vue";
import NoteEditor from "@/components/NoteEditor.vue";
import axios from "axios";
export default defineComponent({
  name: "App",
  components: {
    NoteEditor,
    ReloadPWA,
    ImageInp,
    ImageInput,
    TextNode
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

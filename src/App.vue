<template>
  <ReloadPWA />
  <form method="post" enctype="multipart/form-data" @submit.prevent="onSubmit" >
    <input type="file" multiple >
    <button type="submit">Send</button>
  </form>
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
import axios from "axios";
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
  setup() {
    const cloudName = 'dzggewhvt'
    const onSubmit = (e: any) => {
      const cloudName = 'dzggewhvt'
      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        file: e.target.value,
        upload_preset: 'ze5mrykg'
         } ).then(res => { console.log(res.data);
          })
    }
    return { onSubmit }
  }
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

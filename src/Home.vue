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

import ReloadPWA from "./components/ReloadPWA.vue";

import ImageInp from "./components/ImageInput.vue";
import NoteEditor from "./components/NoteEditor.vue";
import axios from "axios";
export default defineComponent({
  name: "App",
  components: {
    NoteEditor,
    ReloadPWA,
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

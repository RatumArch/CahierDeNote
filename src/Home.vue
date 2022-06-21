<template>
  <ReloadPWA />
  <div class="home">
  <RouterLink to="/document" class="link newdoc">
    New Document
  </RouterLink>
  <RouterLink :to="`/document/${folderCode}`" class="link load-doc">
    Load document from folder code
  </RouterLink><input type="text" v-model="folderCode"/>
  </div>
</template>

<script lang="ts">
import ImageInput from "./components/ImageInput.vue"

import { defineComponent, ref } from "vue";

import ReloadPWA from "./components/ReloadPWA.vue";

import ImageInp from "./components/ImageInput.vue";
import NoteEditor from "./components/NoteEditor.vue";
import axios from "axios";
export default defineComponent({
  name: "Home",
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

    const folderCode = ref('')
    return { onSubmit, folderCode }
  }
});
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

  &:hover {
    text-decoration: underline;
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
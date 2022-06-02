<template>
  <div class="picInp" @mouseover="loggg">  
  <h2>{{picId}}</h2>  
    <picture-input 
      ref="pictureInput"
      width="600" 
      height="600" 
      margin="16"
      accept="image/jpeg,image/png" 
      size="10" 
      button-class="btn"
      :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
      @change="onChange">
    </picture-input>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'PicInput',
  props: { picId: {type: Number, required: false, default: 40 } },
  data () {
    return {
      little: [50, 50],
      medium: [200, 200],
      large: [600, 600]
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    loggg () {
        console.log("dkldklkld");
    }
  },
  updated() {
      loggg()
  }
}
</script>
<style scoped>
.picInp {
    width: max-content;
    resize: both;
    border-style: solid;
    box-sizing: border-box;
    overflow: hidden
}
.picture-input.preview-container {
    width: 100%
}
</style>
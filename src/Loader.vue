<template>
<div class="loader">
    <div class="pancarte">
    <h1>
      <span v-if="tick===-1">Wait</span>
      <span v-if="tick===0">&#xEE06</span><span v-if="tick===1">&#xEE07</span><span v-if="tick===2">&#xEE08</span> <span v-if="tick===3">&#xEE09</span>
    </h1>
        <font-awesome-icon class="icon" icon="fa-solid fa-file-text" />
    </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTick } from './utils';

const tick = useTick(200, 4)


</script>

<style scoped>
@import url(https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css);
h1 {
    text-shadow: 1px 1px 2px blue;
    -webkit-text-stroke-width: 1px;
    font-size: 3em;
    text-decoration: underline;
    animation-name: loading-anim;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;
    font-family: 'Fira Code', monospace;
    font-variant-ligatures: contextual;
}
.icon {
    height: 89%;
    animation-name: loading-anim;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;
}
.loader {
    background-color: white;
    top: 0vh;
    position: absolute;
    z-index: 100;
}
.pancarte {
    background-color: blanchedalmond;
    overflow: hidden;
    position: fixed;
    padding: 20vw;
    top: 15vh;
    height: 30vh;
    z-index: 100;
}
progress {
    width: 100%;
}
@keyframes loading-anim {
  from {
    color: linear-gradient(to right, darkgreen 5%, lightblue);
  }
  10% {
    color: linear-gradient(to right,  darkgreen 15%, lightblue);
  }
  25% {
    color: linear-gradient(to right,  darkgreen 25%, lightblue);
    opacity: 0.8;
  }
  50% {
    color: linear-gradient(to right,  darkgreen 50%, lightblue);
    opacity: 1;
  }
  75% {
    color: linear-gradient(to right,  darkgreen 75%, lightblue);
    opacity: 0.8;
  }
  from {
    color: linear-gradient(to right,  darkgreen 100%, lightblue);
    opacity: 0.4;
  }
}

.editable-title {
  border: none;
  font-size: inherit;
  padding-left: 5px;
  width: 100%;
}
</style>
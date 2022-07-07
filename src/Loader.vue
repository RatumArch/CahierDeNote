<template>
<div class="loader">
    <div class="pancarte">
    <h1>Loading...</h1>
    </div>
</div>
</template>



<style scoped>
h1 {
    color: darkslateblue;
    text-shadow: 1px 1px 2px blue;
    letter-spacing: 1ex;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
}
.loader {
    padding: 5vw;
    width: 90vw;
    height: 90vh;
    opacity: 0.7;
    background-color: blanchedalmond;
    position: fixed;
    top: 10vh;
    left: 0px;

    animation-name: loading-anim;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;
}
.pancarte {
    opacity: 1;
    background-color: white;
    overflow: hidden;
}
progress {
    width: 100%;
}
@keyframes loading-anim {
  from {
    background: linear-gradient(to right, darkgreen 75%, lightblue);
    opacity: 0.2;
  }
  10% {
    background: linear-gradient(to right, darkgreen 50%, lightblue);
    opacity: 0.4;
  }
  25% {
    background: linear-gradient(to right, darkgreen 50%, lightblue);
    opacity: 0.8;
  }
  50% {
    background: linear-gradient(to right, darkgreen 25%, lightblue);
    opacity: 1;
  }
  75% {
    background: linear-gradient(to right, darkgreen 10%, lightblue);
    opacity: 0.8;
  }
  from {
    background: darkgreen;
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
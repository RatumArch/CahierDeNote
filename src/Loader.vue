<template>
<div class="loader">
    <div class="pancarte">
    <h1>Wait</h1>
        <font-awesome-icon class="icon" icon="fa-solid fa-file-text" />

    </div>
</div>
</template>



<style scoped>
h1 {
    color: darkgreen;
    text-shadow: 1px 1px 2px blue;
    letter-spacing: 1ex;
    -webkit-text-stroke-width: 1px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: underline;
    animation-name: loading-anim;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;

}
.icon {
    height: 89%;
    animation-name: loading-anim;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;
}
.loader {
    background-color: white;
    width: 100%;
    top: 0vh;
    position: absolute;
    height: 100%;
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
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
    color: darkslateblue;
    text-shadow: 1px 1px 2px blue;
    letter-spacing: 1ex;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: underline;
    animation-name: loading-anim;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;

}
.icon {
    height: 40vh;
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
    opacity: 0.2;
    background: linear-gradient( darkgreen 5%, lightblue);
  }
  10% {
    background: linear-gradient( darkgreen 15%, lightblue);
    opacity: 0.4;
  }
  25% {
    background: linear-gradient( darkgreen 25%, lightblue);
    opacity: 0.8;
  }
  50% {
    background: linear-gradient( darkgreen 50%, lightblue);
    opacity: 1;
  }
  75% {
    background: linear-gradient( darkgreen 75%, lightblue);
    opacity: 0.8;
  }
  from {
    background: linear-gradient( darkgreen 100%, lightblue);
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
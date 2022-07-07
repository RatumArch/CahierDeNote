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
    padding: 20vw;
    width: 90vw;
    height: 90vh;
    opacity: 0.7;
    background-color: blanchedalmond;
    position: fixed;
    top: 10vh;
}
.pancarte {
    opacity: 1;
    background-color: white;
    overflow: hidden;
}
progress {
    width: 100%;
}
</style>
<template>
  <h1>{{ msg }}</h1>




</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  msg: String
})

</script>

<style scoped>
a {
  color: #42b983;
}
</style>

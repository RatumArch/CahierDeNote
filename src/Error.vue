<template>
    <h1>Error Processing</h1>
    <strong>We are sorry.</strong>
    <RouterLink to="/">Go back Home</RouterLink>
    <hr/>
    <RouterLink :to="`folder/${folderCode}`">Go back to {{folderCode}}</RouterLink>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
const folderCode=ref(route.params?.folderCode)
</script>
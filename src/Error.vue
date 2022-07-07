<template>
    <h1>Error Processing</h1>
    <strong>We are sorry.</strong>
    <RouterLink to="/">Go back Home</RouterLink>
    <RouterLink :to="`folder/${folderCode}`">Go back to {{folderCode}}</RouterLink>
</template>

<script setup>
const folderCode=ref(route.params?.folderCode)
</script>
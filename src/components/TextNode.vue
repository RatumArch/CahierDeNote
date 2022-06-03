<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'TextNode',
    props: {
        template: { default: '<p>OPOPOPOPOP</p>', type: String, required: true }
    },
    setup(props) {}
    
})
</script>

<template>
<h1></h1>
<div v-html="template"></div>
</template>
<template>
<node-view-wrapper ref="wrapper" class="wrapper">
    
    <node-view-content type="text" class="expression" />
    <div class="expression" v-html="equationStyled" ></div>
</node-view-wrapper>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import katex from 'katex'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3';

const props = defineProps({
    node: { type: Object}
})
onMounted(() => props.updateAttributes({ latexNodeId: Date.now()}))

const equation = ref('')
const msgError = ref('')

const applyKatex = async (userInput) => {
    props.updateAttributes({ rawText: userInput})
    return katex.renderToString(userInput)
}

const equationStyled = ref('type above')
    watchEffect(async (newval, val) =>{
        applyKatex(props.node.textContent)
            .then((expr) => equationStyled.value=expr)
            .catch((err) => { msgError.value=''})
    })

</script>

<style >
@import url("https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css");
.wrapper {
    width: 50ex;
}
.expression {
    border-style: dashed;
    border-width: 1px;
}
</style>
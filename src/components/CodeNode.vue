<template>
<node-view-wrapper class="wrapper" as="span"  >
<div class="code-edit" @click.stop="">
    <pre @click="focus" >
    <code class="language-python" contenteditable="true" ref="code" @blur="highl">
    </code>
    </pre>
</div>
</node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3';
import python from 'highlight.js/lib/languages/python'
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

import {  ref } from 'vue';

const content = ref('')

hljs.registerLanguage('python', python)

const highl = () => { hljs.highlightAll() }
const code=ref(null)
const focus = () => { if(code) code.value.focus() }

</script>

<style scoped lang="scss" >
.code-edit {
    border-style: solid;
    
    pre {
      background: #0D0D0D;
      color: #FFF;
      font-variant-ligatures: contextual;
      font-family: 'Fira Code', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
    }
    @supports (font-variation-settings: normal) {
      code { 
        font-family: 'Fira Code', monospace;
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }      
    }
}

.content {
    width: 100%;
    height: 100%;
}
</style>
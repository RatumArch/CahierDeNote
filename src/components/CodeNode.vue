<template>
<node-view-wrapper class="wrapper"  >
<div class="code-edit" @click.stop="" @mouseover="showButton=true" @mouseleave="showButton=false">
    <div class="preview-label">
      <button @click="applyHighlight" v-if="showButton" >Apply highlighting</button>
    </div>
    <pre @click="focus" >
    <code class="language-python" contenteditable="true" ref="code" v-html="content" ></code>
    </pre>
</div>
</node-view-wrapper>
</template>

<script setup>
import { NodeViewWrapper } from '@tiptap/vue-3';
import python from 'highlight.js/lib/languages/python'
import latex from 'highlight.js/lib/languages/latex.js'
import xml from 'highlight.js/lib/languages/xml'
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

import {  onMounted, ref } from 'vue';

const props = defineProps({
    updateAttributes: {
            type: Function,
            required: true,
    }
  })
const content = ref(props.node?.attrs?.rawtext)
const showButton = ref(false)

hljs.registerLanguage('python', python)
hljs.registerLanguage('latex', latex)
hljs.registerLanguage('xml', xml)


const highl = () => { hljs.highlightAll() }
const code=ref(null)
const focus = () => { if(code.value) code.value.focus() }

function applyHighlight ()  {
  if(code.value && code.value.innerHTML!=content.value) {
    const highlighted= hljs.highlightAuto(code.value.innerText)
    props.updateAttributes({rawtext: highlighted.value })
    content.value= highlighted.value
  }
}

onMounted(() => {
  props.updateAttributes({ codeEditId: Date.now() })
})

</script>

<style scoped lang="scss" >
.code-edit {
    border-style: none;
    
    pre {
      background: lightgray;
      font-variant-ligatures: contextual;
      font-family: 'Fira Code', monospace;
      margin-top: 0;
    }
    @supports (font-variation-settings: normal) {
      code {
        display: block;
        padding-left: 5px;
        font-family: 'Fira Code', monospace;
        color: inherit;
        background: none;
      }      
    }
}

</style>
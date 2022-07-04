<template>
<div class="container-noter">
  <div class="button-panel" >
      <button @click="toggleBold" >B</button>
      <button @click="toggleCodeBlock" >Python</button>
      <button @click="addImage" >image</button>
      <button @click="toLeft" >left</button>
      <button @click="toCenter" >center</button>
      <button @click="toggleLatex" title="Add LaTex expression" >LaTex</button>
      <button @click="sendToMongo" class="send">Save</button>
  </div>
  <div class="container-editor" @click="(e) => editor.chain().focus().run()" >
    <editor-content :editor="editor" @keyup="isTypingStopped" @keydown="isTypingRunning" />
  </div>
</div>
</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import ImageNode from '../utils/imgNodeExtension.js'
//import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
//import lowlight from 'lowlight'
import axios from 'axios';
//import LatexBlock from '../utils/latexExtension.ts'
import { useRoute } from 'vue-router'


export default {
  name: 'NoteEditor',
  components: {
    EditorContent,
  },
  props: {
    content: { type: String, required: false },
    title: { type: String, required: false },
    sendToMongo: {required: false}
  },
  setup(props: any) {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          codeBlock: false
        }),
        ImageNode,
        TextAlign.configure({
          types: ['paragraph'],
          defaultAlignment: 'left'
        })
      ],
      content: props.content
    })
  
    const route = useRoute()

    const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
    const toggleCodeBlock = () => editor.value?.chain().focus().toggleCodeBlock().run()
    //@ts-ignore
    const addImage = () => editor.value?.chain().focus().addImage() .focus().run()
    const toLeft = () => editor.value?.chain().focus().setTextAlign('left').run()
    const toCenter = () => editor.value?.chain().focus().setTextAlign('center').run()
    //@ts-ignore
    const toggleLatex = () => editor.value?.chain().insertContent("<latex-block></latex-block>").run()

    const focusOnClick = () => editor.value?.chain().focus().run()

    const sendToMongo = () => props.sendToMongo( editor.value?.getHTML(), editor.value?.getText())


    onUpdated(() => {
        editor.value?.chain().setContent(props.content).focus().run()        
    })
    onBeforeUnmount(() => {
        editor.value?.destroy()
    })

const isTyping = ref(false)
const TypingStatusArray = ref<number[]>([])
const keyUpTimeStamp = ref(0)
const isTypingRunning = (e: MouseEvent) => { isTyping.value = true; }
const isTypingStopped = (e: MouseEvent) => {
  keyUpTimeStamp.value=e.timeStamp
  isTyping.value = false
  return keyUpTimeStamp.value
}

// Auto sync avec timeout
let timeout = setTimeout(() => {
  TypingStatusArray.value.push(keyUpTimeStamp.value)
  const length= TypingStatusArray.value.length
  console.log(TypingStatusArray.value[length]);
  
  if(TypingStatusArray.value[length]-TypingStatusArray.value[length-1]===0 )
    sendToMongo()
}, 1000)


onUnmounted(() => {
  clearTimeout(timeout)
})
    
    return { editor, isTyping, isTypingRunning, isTypingStopped, focusOnClick, sendToMongo, toggleBold, toggleCodeBlock, toggleLatex, addImage, toLeft, toCenter, }
  },
}
</script>

<style lang="scss">
.container-noter {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container-editor {
    min-height: 50vh;
    max-height: 65vh;
    padding: 5vw;
    overflow-y: scroll;
    cursor: text;

    pre {
      background: #0D0D0D;
      color: #FFF;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
    }
    code {
      color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
    }
  }
  .button-panel {
    display: inline;
    top: 50px;
    background-color:#4169e1;
    border-bottom-style: solid;
    padding: 10px;

    button {
      margin-left: 10px;
    }
    button.send {
      padding: 5px;
      background-color: darkcyan;
      color: #FAF594;
      border-style: solid;
      border-width: 2px;
      font-weight: bold;
      border-radius: 2px;
      letter-spacing: 1px;
    }
  }
}

 
 

.hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
        color: #F98181;
    }

.hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
</style>
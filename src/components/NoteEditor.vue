<template>
<div class="container-noter" >
  <div class="button-panel" >
      <button @click="toggleBold" >B</button>
      <button @click="toggleCodeBlock" >Python</button>
      <button @click="addImage" >image</button>
      <button @click="toLeft" >left</button>
      <button @click="toCenter" >center</button>
      <button @click="toggleLatex" title="Add LaTex expression" >LaTex</button>
      <button @click="sendToMongo" class="send">Save</button>
  </div>
  <div class="container-editor" >
    <editor-content :editor="editor" />
  </div>
</div>
</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { onBeforeUnmount, onMounted, onUpdated } from 'vue'
import ImageNode from '../utils/imgNodeExtension.js'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
import lowlight from 'lowlight'
import axios from 'axios';
import LatexBlock from '../utils/latexExtension.ts'

export default {
  name: 'NoteEditor',
  components: {
    EditorContent,
  },
  props: {
    content: { type: String, required: false }
  },
  setup(props: any) {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          codeBlock: false
        }),
        CodeBlockLowlight.configure({
          defaultLanguage: 'python',
          lowlight
        }),
        ImageNode,
        LatexBlock,
        TextAlign.configure({
          types: ['paragraph'],
          defaultAlignment: 'left'
        })
      ],
      content: props.content
    })
  

    const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
    const toggleCodeBlock = () => editor.value?.chain().focus().toggleCodeBlock().run()
    //@ts-ignore
    const addImage = () => { console.log("addimage");
    }
    const toLeft = () => editor.value?.chain().focus().setTextAlign('left').run()
    const toCenter = () => editor.value?.chain().focus().setTextAlign('center').run()
    const toggleLatex = () => editor.value?.chain().focus().addLatex().run()

    const focusOnClick = () => editor.value?.chain().focus().run()

    const sendToMongo = () => { 
      const data = editor.value?.getHTML()
      const rawtext = editor.value?.getText()
      
      axios.post('/api/insertNote', {html: data, raw: rawtext})
    }

    onUpdated(() => {
        editor.value?.chain().setContent(props.content).focus().run()        
    })
    onBeforeUnmount(() => {
        editor.value?.destroy()
    })
    return { editor, focusOnClick, sendToMongo, toggleBold, toggleCodeBlock, toggleLatex, addImage, toLeft, toCenter }
  },
}
</script>

<style lang="scss">
.container-noter {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 100px;
  border-style: solid;
  border-width: 3px;
  border-radius: 20px;
  border-bottom-style: none;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  cursor: text;
  
  .container-editor {
    height: 100%;
    padding: 5vw;

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
    background-color:#B9F18D;
    border-bottom-style: solid;
    padding: 10px;

    button {
      margin-left: 10px;
    }
    button.send {
      padding: 5px;
      background-color: darkcyan;
      color: #FAF594;
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
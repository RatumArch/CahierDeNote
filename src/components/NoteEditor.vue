<template>
<div class="container-noter">
  <div class="button-panel" >
      <button @click="toggleBold" title="bold" :class="{active: editor?.isActive('bold')}" ><strong>Bold</strong> </button>
      <button @click="toggleCodeEdit" title="add code block" ><font-awesome-icon icon="fa-solid fa-laptop-code" /></button>
      <button @click="addImage" :title="ARIA_LABEL.ADD_IMAGE[lang]" :aria-label="ARIA_LABEL.ADD_IMAGE[lang]" ><font-awesome-icon  icon="fa-solid fa-image" ></font-awesome-icon></button>
      <button @click="toLeft" title="CTRL+MAJ+L" :class="{active: editor?.isActive({ textAlign: 'left' })}" >left</button>
      <button @click="toCenter" title="CTRL+MAJ+E" :class="{active: editor?.isActive({ textAlign: 'center' })}" :aria-label="ARIA_LABEL.ALIGN_CENTER[lang]">center</button>
      <button @click="toggleLatex" :title="ARIA_LABEL.ADD_LA_TEX[lang]" :aria-label="ARIA_LABEL.ADD_LA_TEX[lang]" ><font-awesome-icon icon="fa-solid fa-square-root-variable" /></button>
      <button @click="clickToSave" class="send">{{BUTTON.SAVE[lang]}}</button>
      <select v-model="font" @click="setFont" :aria-label="ARIA_LABEL.SLECT_FONT[lang]" >
        <option v-for="fontSelected of FONTS" :key="fontSelected"
                :style="{'font-family': `${fontSelected}, sans-serif`}"
                :selected="editor?.isActive('textStyle', { fontFamily: fontSelected })" >
          {{fontSelected}}
        </option>
      </select>
  </div>
  <div class="container-editor" @click="(e) => focusOnClick()" >
    <editor-content :editor="editor" @keyup="isTypingStopped" @keydown="isTypingRunning" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent, Content } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import ImageNode from '../utils/imgNodeExtension.js'
import LatexBlock from '../utils/latexExtension.ts'
import CodeEdit from '@/utils/codeExtension.ts'
import { useRoute } from 'vue-router'
import { BUTTON } from '@/constants/index.js'
import { useLang } from '@/utils/lang.ts'
import { ARIA_LABEL, FONTS } from '@/constants'

import '@fontsource/raleway/600.css'
import '@fontsource/roboto/400.css'
import '@fontsource/fira-code/400.css'
import '@fontsource/courgette/400.css'
import '@fontsource/kalam/latin-400.css'

  const props = defineProps({
    content: { type: String, required: false },
    title: { type: String, required: false },
    sendToMongo: {required: false, type: Function, default: () => {} },
    autoSaveEnabled: { type: Boolean, required: true, default: true },
    toggleAutoSave: { type: Function, required: false},
    savingTriggered: { type: Boolean, required: true}
  })
  const emit = defineEmits(['contentSavedManually', 'writed'])

const content = ref("")
const font=ref('Fira Code') // La police par défaut est défini dans <style> .ProseMirror {} </style>


    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          codeBlock: false
        }),
        FontFamily,
        ImageNode,
        LatexBlock,
        CodeEdit,
        TextAlign.configure({
          types: ['paragraph'],
          defaultAlignment: 'left'
        }),
        TextStyle
      ],
      content: props.content
    })
  
    const route = useRoute()
    const lang = useLang()

    const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
    //@ts-ignore
    const addImage = () => editor.value?.chain().focus().addImage() .focus().run()
    const toLeft = () => editor.value?.chain().focus().setTextAlign('left').run()
    const toCenter = () => editor.value?.chain().focus().setTextAlign('center').run()
    //@ts-ignore
    const toggleLatex = () => editor.value?.chain().insertContent("<latex-block></latex-block>").run()
    const toggleCodeEdit = () => editor.value?.chain().insertContent("<code-edit></code-edit>").run()
    const setFont = () => editor.value?.chain().setFontFamily(font.value).run()

    const focusOnClick = () => editor.value?.chain().focus().run()

    const sendToMongo = async () => props.sendToMongo( editor.value?.getHTML(), editor.value?.getText())

    async function clickToSave() {
      await sendToMongo();
      emit('contentSavedManually')
    }


onUpdated(() => {
  if(props.savingTriggered ) { editor.value?.commands.insertContent(<string>props.content); };
})

const isTyping = ref(false)
const TypingStatusArray = ref<number[]>([])
const keyUpTimeStamp = ref(1234)
const isTypingRunning = (e: MouseEvent) => { isTyping.value = true; }
const isTypingStopped = (e: MouseEvent) => {
  keyUpTimeStamp.value=e.timeStamp
  isTyping.value = false
  return keyUpTimeStamp.value
}

const interval =ref<any>(null)

onBeforeUnmount(() => {
    editor.value?.destroy()
    clearInterval(interval)
})


const updateContentProp = () => {
  const html = editor.value?.getHTML(); const raw = editor.value?.getText();
  emit('writed', html, raw);
  
}

const defineInterval = () => {
  return setInterval(async () => {
  TypingStatusArray.value.push(keyUpTimeStamp.value)
  const length= TypingStatusArray.value.length
  
  if(TypingStatusArray.value[length-1]-TypingStatusArray.value[length-2]==0 )
    { 
      await sendToMongo()
      updateContentProp()
      clearInterval(interval.value)
      interval.value=null
    }
  }, 800)
}



watch(isTyping, (value) => {
  if(value && !interval.value && props.autoSaveEnabled) {
    interval.value= defineInterval()
  }
})

onUnmounted(() => {
  clearInterval(interval.value)
})
    

</script>

<style lang="scss">
.container-noter {
  display: flex;
  flex-direction: column;
  height: 100%;

  .container-editor {
    min-height: 50vh;
    max-height: 57vh;
    padding: 5vw;
    overflow-y: auto;
    cursor: text;
    border-left-color: lightgray;
    border-left-style: solid;
    &::-webkit-scrollbar{
      background-color: lightgray;
      width: 7px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4169e1;
      border-radius: 10px;
    }

    .ProseMirror {
      padding: 10px;
      font-variant-ligatures: contextual;
      font-family: 'Fira Code', monospace;
    }

  }
  .button-panel {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    top: 50px;
    background-color:#4169e1;
    border-bottom-style: solid;
    padding: 10px;

    button {
      margin-left: 10px;
      background-color: white;
      padding: 4px;
      letter-spacing: 1px;
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;

      &:hover, &:focus {
        border-radius: 0;
      }
      &.active {
        background-color: darkolivegreen;
      }
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

      &:hover, &:focus {
        text-decoration: underline;
      }
    }
    select {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
}
</style>
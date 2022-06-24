<template>
<node-view-wrapper ref="wrapper" class="wrapper" as="span"  >
    
    <input type="text" v-model="equation" 
                        class="expression input" 
                        :class="{empty}" 
                        placeholder="Write \sum"
                        ref="input" />
    <div class="expression katex" v-html="equationStyled" @click="inputFocus" ></div>
</node-view-wrapper>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import katex from 'katex'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3';

const props = defineProps({
    node: { type: Object},
    updateAttributes: {
            type: Function,
            required: true,
        },
})
onMounted(() => {
    props.updateAttributes({ latexNodeId: Date.now()})
    isMounted.value=false
})
const input = ref(null)
const equation = ref('')
const empty = computed(() => equation.value?.length===0)
const inputFocus = () => { input.value.focus();}


const msgError = ref('')
const isMounted = ref(false)
const applyKatex = (userInput) => {
    if(isMounted) { props.node.attrs.rawText= userInput }
    return katex.renderToString(userInput, { throwOnError: false })
}
const equationStyled = computed(() => applyKatex(equation.value, { throwOnError: false }) || props.node?.attrs?.rawText )

</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css");
.wrapper {
    display: inline;
}
.expression {
    border-style: dashed;
    border-width: 1px;
    &.input {
        width: 5ex;
        &:focus {
            width: 80ex;
            padding: 2px;
        }
        &.empty {
            border-color: blue;
            border-style: solid;
            width: 18ex;
        }
    }
    &.katex {
        border-style: none;
        padding-left: 4px;
        padding-right: 4px;
    }
}
</style>
<template>
<node-view-wrapper ref="wrapper">
    <div class="image-input" ref="divima" :style="{width: '84px', height: '84px'}" @mouseleave="hideLabel" @mouseover="openLabel" >
        <span class="preview-label-container" v-if="showLabel">
            <label :for="`image-input-file-${node.attrs.nodeId}`" class="preview-label" v-if="showLabel" >
                <span class="placeholder content" >
                    <font-awesome-icon icon="fa-solid fa-file-image" />
                </span>
            </label>
            <span class="preview-label" v-if="showLabel" title="Feature à implémenter" @click="openFormLink" >
                <font-awesome-icon icon="fa-solid fa-link" />
            </span>
            <form v-if="showFormLink" @submit.prevent="" >
                <button @click.stop="hideFormLink" >X</button>
                <input type="text" placeholder="Feature à implémenter" class="input-link" @click.stop="" />
            </form>
            <span class="preview-label dragging" v-if="showLabel" draggable="true" data-drag-handle >
                <font-awesome-icon icon="fa-solid fa-arrows-up-down-left-right" />
            </span>
        </span>
        <img :src="blobUrl ?? node.attrs.src" class="preview" alt=" image... " />
        
        <input type="file" :id="`image-input-file-${node.attrs.nodeId}`" class="image-input-opaq" accept=".jpg, .jpeg, .png, .svg" ref="input" @input="logFiles" />
        
    </div>
    
</node-view-wrapper>
</template>

<script lang="ts" >
import { onMounted, ref } from 'vue'
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'
import axios from 'axios'

export default {
    name: 'ImageInp',
    props: {
        format: { type: String, default: 'large', required: false},
        updateAttributes: {
            type: Function,
            required: true,
        },
        inputId: { type: String, required: false, default: ''},
        node: { type: Object },

     },
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },
    setup(props: any) {
        
        const formatProps = props.format;

        const width = ref({ little: '50px', medium: '200px', large: '600px' })
        
        const blobUrl = ref<string|null>(null)
        

        const input= ref<any>(null)

        const files = input.value?.files
        const cdnUrl = ref<string>("")
        onMounted(() => props.updateAttributes({ nodeId: Date.now()}))

        const logFiles = (event: any) => {
            let fileUploaded: File = event.target.files[0]
            fileUploaded.arrayBuffer().then(res => {
                const blob = new Blob([res], { type: 'image'})
                

                blobUrl.value= window.URL.createObjectURL( blob)
                const cloudName = 'dzggewhvt'
                axios.post(`/api/uploadImage`, res, { headers: { 'Content-type': 'application/octet-stream'}}  )
                    .then(res => { console.log(res?.data); cdnUrl.value = res.data.url; props.updateAttributes({ src: res.data.url })})
                    .catch((err) => { 
                         axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                            file: res,
                            upload_preset: 'ze5mrykg', 
                            }  )
                            .then(res => { console.log(res?.data); cdnUrl.value = res.data.url; props.updateAttributes({ src: res.data.url })})
                            .catch(err => { console.error(err?.response?.data) })
                    })
            })
            
        }

        const testpaste = (event: any) => { 
            cdnUrl.value= event.clipboardData.getData('text');
            blobUrl.value = cdnUrl.value
            props.updateAttributes({ src: cdnUrl.value })
        }
        
        
        
        const showLabel= ref(props.node.attrs.src?.length===0 && blobUrl.value?.length===0)   
        const showFormLink = ref(false)
        const openLabel = () => { showLabel.value= true }
        const hideLabel = () => { 
            if(blobUrl.value && blobUrl.value?.length >0 || props.node.attrs.src?.length>0)
                showLabel.value= false
        }
        const openFormLink = () => { showFormLink.value= true }
        const hideFormLink = () => { showFormLink.value= false }
    

        return { width, blobUrl, files, hideFormLink, hideLabel, logFiles, cdnUrl, openFormLink, openLabel, showFormLink, showLabel, testpaste }
    }
}
</script>

<style scoped >
@import url('@/styles/buton.scss');
.image-input {
    overflow: hidden;
    resize: both;
    border-style: solid;
    min-width: 20vw;
    min-height: 20vh;
}
.image-input-opaq {
    opacity: 0;
    width: 0;
    height: 0;
}
.input-link {
    position: absolute;
    border-radius: 10px;
    box-shadow: 2px 2px 1px 1px rgba(0,0,0,0.75);
    border-color: black;
}

.dragging {
        cursor: all-scroll;
    }
.preview {
    width: 100%;
    height: 100%;
}

</style>
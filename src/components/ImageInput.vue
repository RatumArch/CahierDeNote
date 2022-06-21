<template>
<node-view-wrapper ref="wrapper">
    <div class="image-input" draggable="true" data-drag-handle ref="divima" >
        <label :for="`image-input-file-${node.attrs.nodeId}`" class="preview-label" >
            <span class="placeholder content" draggable="true" data-drag-handle >Insérer image ici</span>
            <a v-if="cdnUrl.length>0" :href="cdnUrl"> {{cdnUrl}}</a>
            <img :src="blobUrl ?? node.attrs.src" class="preview" alt=" image... " />
            
        </label>
        <input type="file" :id="`image-input-file-${node.attrs.nodeId}`" class="image-input-opaq" accept=".jpg, .jpeg, .png, .svg" ref="input" @input="logFiles"/>
        
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
        
        const blobUrl = ref<string|null>(props.src)
        

        const input= ref<any>(null)
        

        const files = input.value?.files
        const cdnUrl = ref<string>("")
        onMounted(() => props.updateAttributes({ nodeId: Date.now()}))

        const logFiles = (event: any) => {
            let fileUploaded: File = event.target.files[0]
            
            blobUrl.value= window.URL.createObjectURL( fileUploaded)
            const cloudName = 'dzggewhvt'
            axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: fileUploaded,
                    upload_preset: 'ze5mrykg'
                    }  )
                    .then(res => { cdnUrl.value = res.data.url; props.updateAttributes({ src: res.data.url })})
        }

        const testpaste = (event: any) => { 
            cdnUrl.value= event.clipboardData.getData('text');
            blobUrl.value = cdnUrl.value
            props.updateAttributes({ src: cdnUrl.value })
        }

        return { width, blobUrl, files, logFiles, cdnUrl, testpaste }
    }
}
</script>

<style scoped>
.image-input {
    overflow: hidden;
    resize: both;
    border-style: solid;
    width: 10vw;
}
.image-input-opaq {
    opacity: 0;
}
.preview-label {
    overflow: hidden;
    resize: both;
}
.preview {
    width: 100%;
    height: 100%;    
}

</style>
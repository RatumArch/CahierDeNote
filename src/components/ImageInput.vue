<template>
<node-view-wrapper>
    <div class="image-input" draggable="true" data-drag-handle >
        <label for="image-input-opaq" class="preview-label" >
            <span class="placeholder content" draggable="true" data-drag-handle >Insérer image ici</span>
            <a v-if="cdnUrl.length>0" :href="cdnUrl"> {{cdnUrl}}</a>
            <img v-if="blobUrl?.length>0" :src="blobUrl" class="preview"/>
            
        </label>
        <input type="file" id="image-input-opaq" accept=".jpg, .jpeg, .png, .svg" ref="input" @input="logFiles"/>
        
    </div>
    
</node-view-wrapper>
</template>

<script lang="ts" >
import { ref } from 'vue'
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
        node: { type: Object},
        src: { type: String, default: 'https://res.cloudinary.com/dzggewhvt/image/upload/v1654202091/cld-sample-3.jpg', required: false}
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
#image-input-opaq {
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
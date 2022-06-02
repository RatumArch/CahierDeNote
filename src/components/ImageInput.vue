<template>
<node-view-wrapper>
    <div class="image-input" :style="{width: width[format]}">
        <label for="image-input-opaq" class="preview-label">
            <span class="placeholder">Insérer image ici</span>
            <img :src="blobUrl" class="preview"/>
        </label>
        <input type="file" id="image-input-opaq" accept=".jpg, .jpeg, .png, .svg" ref="input" @input="logFiles"/>
    </div>
</node-view-wrapper>
</template>

<script lang="ts" >
import { ref } from 'vue'
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'
export default {
    name: 'ImageInp',
    props: { format: { type: String, default: 'large', required: false}, key: Number },
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

        const logFiles = (event: any) => {
            let fileUploaded: File = event.target.files[0]
            console.log(fileUploaded);console.log(event.target.files.length);
            
            blobUrl.value= window.URL.createObjectURL( fileUploaded)
        }
        return { width, blobUrl, files, logFiles }
    }
}
</script>

<style scoped>
.image-input {
    overflow: hidden;
    resize: vertical;
    border-style: solid;
    width: 5vw;
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
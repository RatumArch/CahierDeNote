import { markPasteRule, Node, mergeAttributes } from '@tiptap/core'
import { markInputRule, VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageInput from '../components/ImageInput.vue'



const ImageNode = Node.create({
  group: 'block',
  //content: 'inline*',
  draggable: true,
  

  addAttributes() {
    return {
      src: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'image-input',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['image-input', mergeAttributes(HTMLAttributes) ]
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageInput)
  },

  addCommands() {
      return {
          addImage: () => ({commands, chain}) => {
              return chain().insertContent(ImageNode )
          }
      }
  }
})

export default ImageNode
import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageInput from '../components/ImageInput.vue'


const ImageNode = Node.create({
  group: 'block',
  
  atom: true,

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
    return ['image-input', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageInput)
  },

  addCommands() {
      return {
          addImage: () => ({commands}) => {
              return commands.insertContent(ImageNode)
          }
      }
  },

})

export default ImageNode
import LatexNode from '@/components/LatexNode.vue'
import { markPasteRule, Node, mergeAttributes } from '@tiptap/core'
import { markInputRule, VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageInput from '../components/ImageInput.vue'



const LatexBlock = Node.create({
  group: 'block',
  content: 'inline*',
  draggable: true,
  

  addAttributes() {
    return {
      content: {
        default: ''
      },
      latexNodeId: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'latex-block',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['latex-block', mergeAttributes(HTMLAttributes) ]
  },

  addNodeView() {
    return VueNodeViewRenderer(LatexNode)
  },

  addCommands() {
      return {
          addLatex: () => ({commands, chain}) => {
              return  commands.insertContent(LatexBlock )
          },
          getEquation: () => ({commands}) => commands.getText()
      }
  }
})

export default LatexBlock
import LatexNode from '@/components/LatexNode.vue'
import { Commands, Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

interface Commands<ReturnType> {
  LatexBlock: {
    addLatex: (someProp: any) => ReturnType
  }
}

const LatexBlock = Node.create({
  name: 'LatexBlock',
  group: 'block',
  //content: 'inline*',
  priority: 201,
  

  addAttributes() {
    return {
      rawText: {
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
        addLatex: () => ({ commands}) => {
          commands.insertContent(LatexBlock)
        }
      }
  },


})

export default LatexBlock
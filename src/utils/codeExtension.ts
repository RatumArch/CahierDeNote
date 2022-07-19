import CodeNode from '@/components/CodeNode.vue'
import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

interface Commands<ReturnType> {
  CodeEdit: {
    addCode: (someProp: any) => ReturnType
  }
}

const CodeEdit = Node.create({
  name: 'CodeEdit',
  group: 'block',
  //content: 'inline*',
  
  
  addAttributes() {
    return {
      rawtext: {
        default: ''
      },
      codeEditId: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'code-edit',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['code-edit', mergeAttributes(HTMLAttributes) ]
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeNode)
  },
  addCommands() {
      return {
        addCode: () => ({ commands}) => {
          commands.insertContent(CodeEdit)
        }
      }
  },


})

export default CodeEdit
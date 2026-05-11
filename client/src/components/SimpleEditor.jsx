import { useRef, useEffect } from 'react'
import { Bold, Italic, Underline, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, List } from 'lucide-react'

export default function SimpleEditor({ value, onChange, className = '' }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const exec = (command, arg) => {
    document.execCommand(command, false, arg)
    editorRef.current?.focus()
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  const tools = [
    { icon: Bold, cmd: 'bold', title: 'Gras' },
    { icon: Italic, cmd: 'italic', title: 'Italique' },
    { icon: Underline, cmd: 'underline', title: 'Souligné' },
    null,
    { icon: Heading1, cmd: 'formatBlock', arg: 'H2', title: 'Titre 1' },
    { icon: Heading2, cmd: 'formatBlock', arg: 'H3', title: 'Titre 2' },
    null,
    { icon: List, cmd: 'insertUnorderedList', title: 'Liste' },
    null,
    {
      icon: LinkIcon, title: 'Lien',
      action: () => { const url = prompt('URL du lien :'); if (url) exec('createLink', url) },
    },
    {
      icon: ImageIcon, title: 'Image',
      action: () => { const url = prompt("URL de l'image :"); if (url) exec('insertImage', url) },
    },
  ]

  return (
    <div className={`border border-slate-300 flex flex-col bg-white ${className}`}>
      <div className="bg-slate-100 border-b border-slate-300 p-2 flex gap-1 flex-wrap items-center">
        {tools.map((tool, i) =>
          tool === null ? (
            <div key={i} className="w-px h-6 bg-slate-300 mx-1" />
          ) : (
            <button
              key={tool.title}
              type="button"
              title={tool.title}
              onClick={tool.action ?? (() => exec(tool.cmd, tool.arg))}
              className="p-1.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded"
            >
              <tool.icon className="w-4 h-4" />
            </button>
          )
        )}
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="p-4 flex-1 outline-none overflow-y-auto prose prose-slate max-w-none focus:ring-2 focus:ring-inset focus:ring-brand-500 min-h-[200px]"
      />
    </div>
  )
}

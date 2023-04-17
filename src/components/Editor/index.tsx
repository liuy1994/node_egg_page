import Oss from "@/utils/oss"
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
import { Editor, Toolbar } from "@wangeditor/editor-for-react"
import { useEffect, useState } from "react"
import "./index.less"

const oss = new Oss()

type InsertFnType = (url: string, alt: string, href: string) => void
interface Props {
  value?: any
  onChange?: any
  readOnly?: boolean
}
const CustomerEditor = (props: Props) => {
  const { value, onChange: _onChange, readOnly = false } = props

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    _onChange(html)
  }, [html])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ["fullScreen"],
  }

  const customUpload = async (file: File, insertFn: InsertFnType) => {
    // TS 语法
    console.log(file, insertFn)
    const url = await oss.upload(file)
    insertFn(url, file.name, url)
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    readOnly: readOnly,
    // TS 语法
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        customUpload,
      },
      uploadVideo: {
        customUpload,
      },
    },
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div className={`editor_wrapper ${readOnly && "is_readOnly"}`}>
      {!readOnly && (
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
      )}
      <Editor
        defaultConfig={editorConfig}
        value={html || value}
        onCreated={setEditor}
        onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: readOnly ? "auto" : "500px", overflowY: "hidden" }}
      />
    </div>
  )
}

export default CustomerEditor

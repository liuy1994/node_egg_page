import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
import { Editor, Toolbar } from "@wangeditor/editor-for-react"
import { useEffect, useState } from "react"
import "./index.less"

type InsertFnType = (url: string, alt: string, href: string) => void
interface Props {
  value?: any
  onChange?: any
}
const CustomerEditor = (props: Props) => {
  const { value, onChange: _onChange } = props

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    setHtml(value)
  }, [value])

  useEffect(() => {
    _onChange(html)
  }, [html])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ["fullScreen"],
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        server: "/api/upload",
        async customUpload(file: File, insertFn: InsertFnType) {
          // TS 语法
          console.log(file, insertFn)
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
          // insertFn(url, alt, href)
        },
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
    <div className={"editor_wrapper"}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: "1px solid #ccc" }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: "500px", overflowY: "hidden" }}
      />
    </div>
  )
}

export default CustomerEditor

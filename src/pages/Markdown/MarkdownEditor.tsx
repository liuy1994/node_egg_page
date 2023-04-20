import { MicroAppWithMemoHistory } from "@@/exports"
import { useEffect, useState } from "react"

interface Props {
  value?: any
  onChange?: any
}

const MarkdownEditor = (props: Props) => {
  const { value, onChange } = props
  const [content, setContent] = useState<string>(value || "")

  useEffect(() => {
    onChange?.(content)
  }, [content])

  return (
    <MicroAppWithMemoHistory
      name="react"
      url="/markdown"
      content={content}
      setContent={setContent}
      autoSetLoading
    />
  )
}

export default MarkdownEditor

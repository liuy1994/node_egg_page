import Editor from "@/components/Editor"
import { getMarkdownDetailApi, postMarkdownApi } from "@/services/markdown"
import { ProForm } from "@ant-design/pro-components"
import { useParams } from "@umijs/max"
import { message } from "antd"
import { useEffect, useRef } from "react"
import "./index.less"

const Markdown = () => {
  const formRef = useRef<any>(null)
  const { id } = useParams<any>()
  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    const content = await getMarkdownDetailApi(id)
    formRef.current.setFieldsValue({ content })
  }

  const onFinish = async ({ content }: any) => {
    console.log(content)
    await postMarkdownApi(content)
    message.success("保存成功")
  }

  return (
    <ProForm
      className={"markdown_wrapper"}
      onFinish={onFinish}
      formRef={formRef}
      submitter={{
        render: (...rest: any) => {
          console.log(rest)
          return null
        },
      }}
    >
      <ProForm.Item name={"content"}>
        <Editor />
      </ProForm.Item>
    </ProForm>
  )
}
export default Markdown

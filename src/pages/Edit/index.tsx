import Editor from "@/components/Editor"
import PageContainerWrapper from "@/components/PageContainerWrapper"
import { useParams } from "@@/exports"
import { ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { useMemo, useRef } from "react"

const Edit = () => {
  const { id } = useParams<any>()
  const breadcrumbItems = useMemo(() => {
    return id
      ? [
          {
            title: "列表",
            path: "/list",
          },
          {
            title: "编辑",
          },
        ]
      : [
          {
            title: "新增",
          },
        ]
  }, [id])
  const formRef = useRef<any>(null)

  return (
    <PageContainerWrapper
      breadcrumb={{
        items: breadcrumbItems,
      }}
    >
      <ProForm formRef={formRef}>
        <ProFormText name={"title"} label={"标题"} rules={[{ required: true }]} />
        <ProFormTextArea name={"desc"} label={"描述"} />
        <ProForm.Item label={"正文"} name={"detail"} rules={[{ required: true }]}>
          <Editor />
        </ProForm.Item>
      </ProForm>
    </PageContainerWrapper>
  )
}

export default Edit

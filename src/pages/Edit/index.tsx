import Editor from "@/components/Editor"
import PageContainerWrapper from "@/components/PageContainerWrapper"
import { createContentAPi, getContentApi, updateContentAPi } from "@/services/content"
import {
  ProForm,
  ProFormDependency,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components"
import { history, useParams } from "@umijs/max"
import { message } from "antd"
import { useEffect, useMemo, useRef } from "react"

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
  const detailDomRef = useRef<any>(null)

  useEffect(() => {
    id && getDetail()
  }, [id])

  const getDetail = async () => {
    const detail = await getContentApi(id!)
    formRef.current.setFieldsValue(detail)
  }

  const onFinish = async (values: any) => {
    console.log(values)
    const { id } = values
    if (id) {
      await updateContentAPi(values)
      message.success("编辑成功")
    } else {
      await createContentAPi(values)
      message.success("新增成功")
    }
    history.push("/list")
  }

  const validateDetail = () => {
    if (!detailDomRef.current?.innerText) {
      return Promise.reject("请输入正文")
    }
    return Promise.resolve()
  }

  return (
    <PageContainerWrapper
      breadcrumb={{
        items: breadcrumbItems,
      }}
    >
      <ProForm formRef={formRef} onFinish={onFinish}>
        <ProFormText name={"id"} hidden />
        <ProFormText name={"title"} label={"标题"} rules={[{ required: true }]} />
        <ProFormTextArea name={"desc"} label={"描述"} />
        <ProForm.Item
          label={"正文"}
          name={"detail"}
          rules={[{ required: true, validator: validateDetail, validateTrigger: ["onBlur"] }]}
        >
          <Editor />
        </ProForm.Item>
        <ProFormDependency name={["detail"]} hidden>
          {({ detail }) => {
            return <div dangerouslySetInnerHTML={{ __html: detail }} ref={detailDomRef} />
          }}
        </ProFormDependency>
      </ProForm>
    </PageContainerWrapper>
  )
}

export default Edit

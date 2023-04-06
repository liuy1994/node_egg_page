import PageContainerWrapper from "@/components/PageContainerWrapper"
import { getContentApi } from "@/services/content"
import { ProForm, ProFormDependency, ProFormText } from "@ant-design/pro-components"
import { Link, useParams } from "@umijs/max"
import { Button, Space } from "antd"
import { useEffect, useRef } from "react"

const Detail = () => {
  const { id } = useParams<any>()
  const formRef = useRef<any>(null)
  useEffect(() => {
    id && getDetail()
  }, [id])
  const getDetail = async () => {
    const detail = await getContentApi(id!)
    formRef.current.setFieldsValue(detail)
  }
  return (
    <PageContainerWrapper
      extra={
        <Space>
          <Link to={`/edit/${id}`}>
            <Button type={"primary"}>编辑</Button>
          </Link>
        </Space>
      }
      breadcrumb={{
        items: [
          {
            title: "列表",
            path: "/list",
          },
          {
            title: "详情",
          },
        ],
      }}
    >
      <ProForm
        formRef={formRef}
        submitter={{
          render: () => null,
        }}
      >
        <ProFormText name={"title"} label={"标题"} readonly />
        <ProFormText name={"desc"} label={"描述"} readonly />
        <ProFormDependency name={["detail"]}>
          {({ detail }) => {
            return (
              <ProForm.Item label={"正文"}>
                <div dangerouslySetInnerHTML={{ __html: detail }} />
              </ProForm.Item>
            )
          }}
        </ProFormDependency>
      </ProForm>
    </PageContainerWrapper>
  )
}

export default Detail

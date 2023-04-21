import MarkdownEditor from "@/pages/Markdown/MarkdownEditor"
import { getMarkdownListApi, postMarkdownApi, updateMarkdownApi } from "@/services/markdown"
import ProCard from "@ant-design/pro-card"
import { ProForm, ProFormText } from "@ant-design/pro-components"
import { Button, Collapse, message, Row, Spin, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react"
import "./index.less"
const { Panel } = Collapse

const Markdown = () => {
  const [list, setList] = useState<any[]>([{ id: "undefined" }])
  const [show, setShow] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<any>(null)
  useEffect(() => {
    getMarkdownList()
  }, [])

  const dealListToObj = (list: any): object => {
    return list.reduce((prev: any, current: any) => {
      return {
        ...prev,
        [current.id]: current,
      }
    }, {})
  }

  const getMarkdownList = async () => {
    const res = await getMarkdownListApi()
    if (res.length) {
      setList(res)
      console.log(res?.[0]?.id?.toString())
      setShow([res?.[0]?.id?.toString()])
      formRef.current.setFieldsValue(dealListToObj(res))
    }
  }

  const onSave = async (id: number | string) => {
    const values = await formRef.current.getFieldsValue()
    const params = values[id]
    try {
      setLoading(true)
      if (!params.id) {
        await postMarkdownApi(params)
      } else {
        await updateMarkdownApi(params)
      }
      message.success("保存成功")
    } finally {
      setLoading(false)
    }
  }

  const onChangeCollapse = (keys: string[] | any) => {
    setShow(keys)
  }
  const onAdd = async () => {
    await postMarkdownApi({
      title: "",
      content: "",
    })
    await getMarkdownList()
  }

  return (
    <Spin spinning={loading}>
      <ProCard className={"markdown_wrapper"}>
        {list.some((t) => t.user_id === 3) && (
          <Row className={"add-row"}>
            <Button onClick={onAdd}>添加一个记录</Button>
          </Row>
        )}
        <ProForm
          formRef={formRef}
          submitter={{
            render: () => null,
          }}
        >
          <Collapse onChange={onChangeCollapse} activeKey={show}>
            {list.map((t: any) => {
              return (
                <Panel
                  header={
                    <ProFormText
                      name={[t.id, "title"]}
                      fieldProps={{
                        size: "small",
                        onClick: (e: any) => {
                          e.stopPropagation()
                        },
                      }}
                    />
                  }
                  key={t.id}
                  extra={
                    <Tooltip title={show.includes(t.id.toString()) ? "" : "先展开才能保存"}>
                      <Button
                        disabled={!show.includes(t.id.toString())}
                        type={"primary"}
                        onClick={(e: any) => {
                          e.stopPropagation()
                          onSave(t.id)
                        }}
                      >
                        保存
                      </Button>
                    </Tooltip>
                  }
                >
                  <ProForm.Item name={[t.id, "id"]} hidden />
                  <ProForm.Item name={[t.id, "content"]}>
                    <MarkdownEditor />
                  </ProForm.Item>
                </Panel>
              )
            })}
          </Collapse>
        </ProForm>
      </ProCard>
    </Spin>
  )
}
export default Markdown

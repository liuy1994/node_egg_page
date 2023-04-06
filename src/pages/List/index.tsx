import PageContainerWrapper from "@/components/PageContainerWrapper"
import ProTableWrapper from "@/components/ProTableWrapper"
import { deleteContentApi, getContentListApi } from "@/services/content"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ProColumns } from "@ant-design/pro-components"
import { Link } from "@umijs/max"
import { Button, message, Modal, Space } from "antd"
import { useRef } from "react"

const List = () => {
  const columns: ProColumns<any>[] = [
    {
      title: "id",
      dataIndex: "id",
      search: false,
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "描述",
      dataIndex: "desc",
    },
    {
      title: "操作",
      fixed: "right",
      render: (_, row) => {
        return (
          <Space>
            <Link to={`/edit/${row.id}`}>编辑</Link>
            <Link to={`/detail/${row.id}`}>详情</Link>
            <Button type={"text"} danger onClick={() => deleteItem(row.id)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  const actionRef = useRef<any>(null)
  const deleteItem = (id: number) => {
    Modal.confirm({
      title: "删除",
      icon: <ExclamationCircleOutlined />,
      content: "你确定删除这条记录吗",
      okText: "确认",
      okButtonProps: { danger: true },
      cancelText: "取消",
      onOk: async () => {
        await deleteContentApi(id)
        message.success("删除成功")
        actionRef.current?.reload()
      },
    })
  }

  return (
    <PageContainerWrapper>
      <ProTableWrapper
        toolbar={{
          title: "列表标题",
          subTitle: "列表副标题",
        }}
        actionRef={actionRef}
        request={getContentListApi}
        columns={columns}
        rowKey={"id"}
        toolBarRender={() => [
          <Link to={"/create"} key={"create"}>
            <Button type={"primary"}>新增</Button>
          </Link>,
        ]}
      />
    </PageContainerWrapper>
  )
}

export default List

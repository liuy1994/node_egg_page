import PageContainerWrapper from "@/components/PageContainerWrapper"
import ProTableWrapper from "@/components/ProTableWrapper"
import { getListApi } from "@/services/content"
import { ProColumns } from "@ant-design/pro-components"
import { Link } from "@umijs/max"
import { Button, Space } from "antd"

const List = () => {
  const columns: ProColumns<any>[] = [
    {
      title: "id",
      dataIndex: "id",
      search: false,
    },
    {
      title: "标题",
      dataIndex: "name",
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
          </Space>
        )
      },
    },
  ]

  return (
    <PageContainerWrapper>
      <ProTableWrapper
        toolbar={{
          title: "列表标题",
          subTitle: "列表副标题",
        }}
        request={getListApi}
        columns={columns}
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

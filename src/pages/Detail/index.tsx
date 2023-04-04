import PageContainerWrapper from "@/components/PageContainerWrapper"

const Detail = () => {
  return (
    <PageContainerWrapper
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
      Detail
    </PageContainerWrapper>
  )
}

export default Detail

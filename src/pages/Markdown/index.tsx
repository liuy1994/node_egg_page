import ProCard from "@ant-design/pro-card"
import { MicroAppWithMemoHistory } from "@umijs/max"
import "./index.less"

const Markdown = () => {
  return (
    <ProCard className={"markdown_wrapper"}>
      <MicroAppWithMemoHistory name="react" url="/markdown" />
    </ProCard>
  )
}
export default Markdown

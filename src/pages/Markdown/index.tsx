import ProCard from "@ant-design/pro-card"
import { marked } from "marked"
import "./index.less"

console.log(marked)

const Markdown = () => {
  return <ProCard className={"markdown_wrapper"}></ProCard>
}
export default Markdown

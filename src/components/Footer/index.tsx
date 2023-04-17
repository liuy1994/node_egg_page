import { GithubOutlined } from "@ant-design/icons"
import { DefaultFooter } from "@ant-design/pro-components"
import { Row } from "antd"
import React from "react"

const Footer: React.FC = () => {
  const defaultMessage = "lalalalala"

  const currentYear = new Date().getFullYear()

  return (
    <>
      <DefaultFooter
        style={{
          background: "none",
        }}
        copyright={`${currentYear} ${defaultMessage}`}
        links={[
          {
            key: "Ant Design Pro",
            title: "Ant Design Pro",
            href: "https://pro.ant.design",
            blankTarget: true,
          },
          {
            key: "github",
            title: <GithubOutlined />,
            href: "https://github.com/ant-design/ant-design-pro",
            blankTarget: true,
          },
          {
            key: "Ant Design",
            title: "Ant Design",
            href: "https://ant.design",
            blankTarget: true,
          },
        ]}
      />
      <Row justify={"center"}>
        <a href="https://beian.miit.gov.cn/" target="_blank" style={{ color: "inherit" }} rel="noreferrer">
          蜀ICP备2023008526号
        </a>
      </Row>
    </>
  )
}

export default Footer

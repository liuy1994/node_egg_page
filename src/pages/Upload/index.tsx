import { useQuery } from "@/utils/hooks"
import Oss from "@/utils/oss"
import { MicroAppWithMemoHistory } from "@@/exports"
import { UploadOutlined } from "@ant-design/icons"
import ProCard from "@ant-design/pro-card"
import { Button, Upload } from "antd"
import { useState } from "react"

const UploadCom = () => {
  const query = useQuery()
  const [url, setUrl] = useState<string>("")
  const oss = new Oss()
  const beforeUpload = async (file: File) => {
    const url = await oss.upload(file)
    console.log(url)
    return false
  }

  return (
    <div className={"upload_wrapper"}>
      {query?.type ? (
        <>
          <ProCard title={"上传图片至OSS"}>
            <Upload beforeUpload={beforeUpload} fileList={[]}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </ProCard>
          <ProCard title={"渲染图片"}>{url && <img src={url} alt="" />}</ProCard>
        </>
      ) : (
        <>
          <ProCard title={"从子应用中获取图片url"}>
            <MicroAppWithMemoHistory name="vue" url="/upload" getUrl={setUrl} autoSetLoading />
          </ProCard>
          <ProCard title={"在主应用中渲染图片"}>{url && <img src={url} alt="" />}</ProCard>
        </>
      )}
    </div>
  )
}

export default UploadCom

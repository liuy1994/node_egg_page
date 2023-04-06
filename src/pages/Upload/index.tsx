import Oss from "@/utils/oss"
import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload } from "antd"

const UploadCom = () => {
  const oss = new Oss()
  const beforeUpload = async (file: File) => {
    const url = await oss.upload(file)
    console.log(url)
    return false
  }
  return (
    <div className={"upload_wrapper"}>
      <Upload beforeUpload={beforeUpload} fileList={[]}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
}

export default UploadCom

import Oss from "@/utils/oss"
import { Button, Image, message, Progress, Upload } from "antd"
import type { UploadFile } from "antd/es/upload/interface"
import { useEffect, useState } from "react"

const oss = new Oss()

const LargeUpload = () => {
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const urls = [
    "https://crud-1317342728.cos.ap-chengdu.myqcloud.com/20230506/test.jpg/test.jpg_0",
    "https://crud-1317342728.cos.ap-chengdu.myqcloud.com/20230506/test.jpg/test.jpg_1",
  ]

  useEffect(() => {
    getFile()
  }, [])

  const getName = (url: string) => {
    const arr = url.split("/")
    const last = arr.at(-1)
    const arr2 = last?.split("_") || []
    return arr2?.slice(0, arr2.length - 1).join("") || ""
  }
  const getFile = async () => {
    const name = getName(urls[0])
    const blobs = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url)
        const blob = await res.blob()
        return blob
      }),
    )
    const data = new Blob(blobs)
    const file = new File([data], name)
    const blobUrl = URL.createObjectURL(file)
    console.log(blobUrl)
  }

  const handleChange: any = (info: any) => {
    let newFileList = [...info.fileList]

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2)

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setFileList(newFileList)
  }
  const chunkSize = 500000

  const getChunks = (file: File) => {
    let base = 0
    let chunks = []
    while (base <= file.size) {
      chunks.push(file.slice(base, base + chunkSize))
      base += chunkSize
    }
    return chunks
  }

  const beforeUpload = async (file: any) => {
    if (file.size! > 10240000) {
      return message.error("太大了")
    }

    const chunks = getChunks(file)
    console.log(chunks)

    try {
      setLoading(true)
      setFileList(fileList.concat(file))
      chunks.map(async (chunk, idx) => {
        const url = await oss.upload(chunk, `${file.name}_${idx}`, file.name)
        console.log({ url })
      })
    } finally {
      setLoading(false)
    }
    return false
  }

  return (
    <div className="large_upload">
      <p>仅供测试，不要真的上传大文件</p>
      <Upload
        beforeUpload={beforeUpload}
        accept="image/*"
        disabled={loading}
        fileList={fileList}
        onChange={handleChange}
      >
        <Button type="primary">上传</Button>
      </Upload>
      {loading && <Progress percent={99} />}
      <div style={{ marginBlock: 20 }}>
        <Image
          src="https://crud-1317342728.cos.ap-chengdu.myqcloud.com/20230506/u%3D35572153%2C3212164277%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG.webp"
          sizes="120"
        />
      </div>
    </div>
  )
}

export default LargeUpload

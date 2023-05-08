import Oss from "@/utils/oss"
import { Button, message, Progress, Upload } from "antd"
import type { UploadFile } from "antd/es/upload/interface"
import { useEffect, useState } from "react"

const oss = new Oss()

const LargeUpload = () => {
  const [loading, setLoading] = useState<number>(0)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [urls, setUrls] = useState<string[]>([])
  const [finalUrl, setFinalUrl] = useState<string>("")

  useEffect(() => {
    if (urls.length) {
      getFile()
    } else {
      setFinalUrl("")
    }
  }, [urls])

  useEffect(() => {
    if (!fileList.length) {
      setUrls([])
    }
  }, [fileList])

  const getIdx = (url: string) => {
    const splitIdx = url.lastIndexOf("_")
    return Number(url.slice(splitIdx + 1))
  }

  const getName = (url: string) => {
    const lastName = url.slice(url.lastIndexOf("/") + 1)
    return lastName.slice(0, lastName.lastIndexOf("_"))
  }
  const getFile = async () => {
    const name = getName(urls[0])
    const blobs = await Promise.all(
      urls
        .sort((a, b) => getIdx(a) - getIdx(b))
        .map(async (url) => {
          const res = await fetch(url)
          const blob = await res.blob()
          return blob
        }),
    )
    const data = new Blob(blobs)
    const file = new File([data], name)
    const blobUrl = URL.createObjectURL(file)
    setFinalUrl(blobUrl)
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
  const chunkSize = 512000

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
    if (file.size! <= chunkSize) {
      return message.error("太小了，切不了片")
    }
    if (file.size! > 20480000) {
      return message.error("真的太大了")
    }

    const chunks = getChunks(file)

    try {
      setLoading(1)
      setUrls([])
      setFileList([file])
      chunks.map(async (chunk, idx) => {
        const url = await oss.upload(chunk, `${file.name}_${idx}`, file.name)
        setUrls((pre) => [...pre, url])
        setLoading((pre) => {
          let base = pre === 1 ? 0 : pre
          return Number((base + 100 / chunks.length).toFixed(0))
        })
      })
    } finally {
      setTimeout(() => {
        setLoading(0)
      }, 100)
    }
    return false
  }

  return (
    <div className="large_upload">
      <p>仅供测试，不要真的上传大大大文件</p>
      <Upload
        beforeUpload={beforeUpload}
        accept="image/*"
        disabled={loading !== 0 && loading !== 100}
        fileList={fileList}
        onChange={handleChange}
      >
        <Button type="primary">上传</Button>
      </Upload>
      {Boolean(loading) && <Progress percent={loading} />}
      <div style={{ marginBlock: 20 }}>
        <img
          src={
            finalUrl ||
            "https://crud-1317342728.cos.ap-chengdu.myqcloud.com/20230506/u%3D35572153%2C3212164277%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG.webp"
          }
          alt=""
          style={{ maxHeight: 640, objectFit: "contain" }}
        />
      </div>
    </div>
  )
}

export default LargeUpload

import { getOssStsApi } from "@/services/common"
import { message } from "antd"
import COS from "cos-js-sdk-v5"

class Oss {
  private cos: any = null

  constructor() {
    this.getConfig()
  }

  async getConfig() {
    try {
      const res = await getOssStsApi()
      const { credentials, ...config } = res
      this.cos = new COS({
        getAuthorization: (options, callback) => {
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            SecurityToken: credentials.sessionToken,
            StartTime: config.startTime,
            ExpiredTime: config.expiredTime,
          })
        },
      })
    } catch {
      message.error("暂时关闭了上传功能")
    }
  }

  async upload(file: File | Blob, name?: string, extraFolderName?: string): Promise<string> {
    console.log(name)
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let uploadDay = `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`
    const key = `/${uploadDay}${extraFolderName ? `/${extraFolderName}` : ""}/${name || file.name}`

    return new Promise((resolve, reject) => {
      if (this.cos) {
        this.cos.putObject(
          {
            Bucket: "crud-1317342728",
            Region: "ap-chengdu",
            Key: key,
            Body: file,
          },
          (err: any, data: any) => {
            if (err) {
              if (err?.message?.includes("CORS")) {
                message.error("暂时关闭了上传功能")
              } else {
                message.error("文件上传失败，请稍后重试")
              }
              reject(err)
            } else {
              const url = `https://${data.Location}`
              resolve(url)
            }
          },
        )
      } else {
        message.error("暂时关闭了上传功能")
      }
    })
  }
}

export default Oss

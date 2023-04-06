import type { IApi } from "umi"

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $("head").append([
      "<meta charset='utf-8' />",
      "<script src='//unpkg.com/cos-js-sdk-v5/demo/common/cos-auth.min.js' />",
    ])
    return $
  })
}

import type { IApi } from "umi"

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $("head").append(["<meta charset=\"utf-8\" />"])
    return $
  })
}

import { request } from "@@/exports"

export const getMarkdownDetailApi = (id?: string) => {
  return request("/api/markdown", {
    params: { id },
  })
}
export const getMarkdownHistoryApi = () => {
  return request("/api/markdown/history")
}
export const postMarkdownApi = (content: string) => {
  return request("/api/markdown", {
    method: "POST",
    data: { content },
  })
}

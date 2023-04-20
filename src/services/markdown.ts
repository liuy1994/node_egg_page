import { request } from "@@/exports"

export const getMarkdownListApi = () => {
  return request("/api/markdown")
}

export const getMarkdownDetailApi = (id: string) => {
  return request(`/api/markdown/${id}`)
}

export const postMarkdownApi = (data: any) => {
  return request("/api/markdown", {
    method: "POST",
    data,
  })
}
export const updateMarkdownApi = (data: any) => {
  return request(`/api/markdown/${data.id}`, {
    method: "PUT",
    data,
  })
}

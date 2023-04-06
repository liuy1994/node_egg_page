import { request } from "@umijs/max"

export const getContentListApi = (params: any) => {
  return request("/api/content", {
    params,
  })
}

export const createContentAPi = (params: any) => {
  return request("/api/content", {
    method: "POST",
    data: params,
  })
}
export const updateContentAPi = (params: any) => {
  return request(`/api/content/${params.id}`, {
    method: "PUT",
    data: params,
  })
}

export const deleteContentApi = (id: number) => {
  return request(`/api/content/${id}`, { method: "DELETE" })
}

export const getContentApi = (id: string) => {
  return request(`/api/content/${id}`)
}

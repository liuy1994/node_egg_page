import { request } from "@umijs/max"

export const getOssStsApi = () => {
  return request("/api/ossSts")
}

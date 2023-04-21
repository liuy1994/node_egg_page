import { useLocation } from "@umijs/max"

export const useQuery = () => {
  const location = useLocation()
  const search = location?.search?.slice(1) || ""
  const searchArr = search.split("&")
  return searchArr.reduce((prev: any, current: string) => {
    const arr = current.split("=")
    prev[arr[0]] = arr[1]
    return prev
  }, {})
}

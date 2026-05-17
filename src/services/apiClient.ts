import axiosInstance from "@/helper/axiosInstanc"

export async function get<T = any>(url: string, config = {}) {
  const res = await axiosInstance.get<T>(url, config)
  return res.data
}

export async function post<T = any>(url: string, data?: any, config = {}) {
  const res = await axiosInstance.post<T>(url, data, config)
  return res.data
}

export default { get, post }

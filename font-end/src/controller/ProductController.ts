import axios from "axios"

const api = import.meta.env.VITE_API_URL

export interface Product {
  product_id: number
  product_name: string
  product_unit: string
  product_reorder_level: number
}

export const productQuery = async (): Promise<Product[]> => {
  const resposse = await axios.get(`${api}/product`)
  return resposse.data.data
}

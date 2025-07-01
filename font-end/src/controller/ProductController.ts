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

export const productCreate = async (data: Product) : Promise<Product[]> => {

  const product_name = data.product_name
  const product_reorder = data.product_reorder_level
  const product_unit = data.product_unit

  const resposse = await axios.post(`${api}/product/create`, {
    product_name: product_name,
    product_reorder_level: product_reorder,
    product_unit: product_unit
  })

  return resposse.data.data
}

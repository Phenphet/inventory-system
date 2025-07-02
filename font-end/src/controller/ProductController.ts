import axios from "axios"

const api = import.meta.env.VITE_API_URL

export interface Product {
  product_id: number
  product_name: string
  product_unit: string
  product_reorder_level: number
}

export const productQuery = async (): Promise<Product[]> => {
  const respose = await axios.get(`${api}/product`)
  return respose.data.data
}

export const productCreate = async (data: Product) : Promise<Product[]> => {

  const product_name = data.product_name
  const product_reorder = data.product_reorder_level
  const product_unit = data.product_unit

  const respose = await axios.post(`${api}/product/create`, {
    product_name: product_name,
    product_reorder_level: product_reorder,
    product_unit: product_unit
  })

  return respose.data.data
}

export const productUpdate = async (data: Product) : Promise<Product[]> => {
  const product_id = data.product_id
  const product_name = data.product_name
  const product_reorder = data.product_reorder_level
  const product_unit = data.product_unit

  const response = await axios.put(`${api}/product/update/${product_id}`, {
    product_name: product_name,
    product_reorder_level: product_reorder,
    product_unit: product_unit
  })

  return response.data.data
}

export const productDelete = async(id: Number) : Promise<Product[]> => {
  const product_id = id

  const response = await axios.delete(`${api}/product/delete/${product_id}`)

  return response.data.data
}
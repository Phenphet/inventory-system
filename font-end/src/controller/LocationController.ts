import axios from "axios"

const api = import.meta.env.VITE_API_URL

export interface Location {
  location_id: Number,
  location_name: String,
  location_province: String
}

export const locationQuery = async() : Promise<Location[]>=> {
  const response = await axios.get(`${api}/location`)

  return response.data.data
}

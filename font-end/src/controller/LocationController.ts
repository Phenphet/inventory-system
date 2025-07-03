import axios from "axios"

const api = import.meta.env.VITE_API_URL

export interface Location {
  location_id: Number,
  location_name: String,
  location_province: String
}

export const locationQuery = async() : Promise<Location[]> => {
  const response = await axios.get(`${api}/location`)

  return response.data.data
}


export const loactionCreate = async(data : Location) : Promise<Location[]> => {
  const location_name = data.location_name
  const location_province = data.location_province

  const response = await axios.post(`${api}/location/create`, {
    location_name: location_name,
    location_province: location_province
  })

  return response.data.data
}

export const locationUpdate = async(data: Location) : Promise<Location[]> => {
  const location_id = data.location_id
  const location_name = data.location_name
  const location_province = data.location_province

  const response = await axios.put(`${api}/location/update/${location_id}`, {
    location_name: location_name,
    location_province: location_province
  })

  return response.data.data
}


export const location_delete = async(id: Number) : Promise<Location[]> => {
  const location_id = id

  const response = await axios.delete(`${api}/location/delete/${location_id}`)

  return response.data.data
}

import axios from 'axios'
const BASEURL = 'https://safargram.liara.run/api'

const apiClient = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('token') ?? null}`,
  },
})

import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const handleApiError = (error) => {
  if (error.response) {
    const showToast = useToast()
    const router = useRouter()

    const status = error.response.status
    const message = error.response.data?.message || 'An error occurred'

    console.log(error.response)

    switch (status) {
      case 400:
        // router.push('/auth/login')
        break
      case 401:
        showToast(message, 'error')
        router.push('/auth/login')
        break
      case 404:
        showToast.error(message)

        break
      case 500:
        showToast.error(message, 'error')

        break
      default:
        console.error(`Error: ${message}`)
    }
  } else if (error.request) {
    console.error('No response received from server')
  } else {
    console.error(`Error setting up request: ${error.message}`)
  }
}

const Get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params })
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

const Post = async (url, data) => {
  try {
    const response = await apiClient.post(url, data)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

const Put = async (url, data) => {
  try {
    const response = await apiClient.put(url, data)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

const Delete = async (url) => {
  try {
    const response = await apiClient.delete(url)
    return response.data
  } catch (error) {
    handleApiError(error)
    throw error
  }
}

export default {
  Get,
  Post,
  Put,
  Delete,
}

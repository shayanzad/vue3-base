import axios from 'axios'
const BASEURL = 'https://safargram.liara.run/api'

const apiClient = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${localStorage.getItem('token') ?? null}`,
  },
})
import { useRouter } from 'vue-router'
import useToast from '@/utils/useToast'
const showToast = useToast()
const router = useRouter()

const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.data.code
    const message = error.response.data?.message || 'An error occurred'
    console.log(error.response.data.message)

    switch (status) {
      case 400:
        showToast(message, 'error')
        // router.push('/auth/login')
        break
      case 401:
        showToast(error.response.data.error, 'error')
        router.push('/auth/login')
        break
      case 404:
        console.error(message)
        break
      case 500:
        console.log(error.response.data)
        showToast(error.response.data.message, 'error')

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

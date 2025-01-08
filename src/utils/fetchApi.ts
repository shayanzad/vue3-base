import { ofetch, FetchOptions } from "ofetch";
import { useToast } from "vue-toastification"
import { ApiResponseInterface } from "../models/ApiResponse.Interface";
const toats = useToast()

export const fetchApi = <T>(url: string, options: FetchOptions = {}): Promise<ApiResponseInterface<T>> => {
    const userStore = useUserStore()
    userStore.isLoggedIn && (options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${userStore.token}`,
        'Accept': 'application/json',

    })
    const customOptions: FetchOptions = {
        ...options,
        baseURL: 'https://shayantarabar-new.liara.run/api',
        ignoreResponseError: true,
        onResponse({ response }) {
            const errors = response._data?.errors
            const error = response._data?.error
            if (response.status === 401) {
                userStore.token = null
                userStore.user = null
                localStorage.clear()
                location.reload()
            }
            if(response.status === 403) {
                if(response.url.includes('/v1/rooms/show/')) return                
                toats.error('دسترسی ندارید')
                return
            }
            if (error) {
                toats.error(error)
            }
            if (errors) {
                Object.keys(errors).forEach(key => {
                    const error = errors[key]
                    if (error) {
                        toats.error(error[0])
                    }
                })
            }
        },
        headers: {
            ...options.headers
        }
    }

    return ofetch(url, {...customOptions, responseType: 'json'})
}

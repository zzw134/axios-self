import {Axios, AxiosRequestConfig, AxiosResponse} from 'axios'
interface RequestInterceptors<T=AxiosResponse> {
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorsCatch?: (err: any) => any
    responseInterceptors?: (res: T) => T
    responseInterceptorsCatch?: (err: any) => any
}
interface RequestConfig<T=AxiosResponse> extends AxiosRequestConfig{
    interceptors?: RequestInterceptors<T>
    showLoading?: {
        title?: string
        color?: string
    }
}


export {RequestConfig, RequestInterceptors}
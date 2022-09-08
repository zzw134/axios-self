import axios, {AxiosInstance, AxiosResponse} from "axios";
import {RequestConfig, RequestInterceptors} from "./type";
import loading from '../loading'
import LoadingType from "../loading/type";
import '../../src/loading/css'

class Request {
    instance: AxiosInstance  // axios实例
    interceptors?: RequestInterceptors  // 拦截器选项
    loading?: LoadingType  // loading遮罩层函数
    showLoading?: boolean  // 是否显示loading
    recordShowLoading: boolean  // 备份实例的loading状态
    recordLoadingInfo: LoadingType  // 备份实例的loading信息
    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors
        this.loading = loading(config.showLoading?.title, config.showLoading?.color)
        this.showLoading = config.showLoading ? true : false
        this.recordShowLoading = this.showLoading
        this.recordLoadingInfo = this.loading

        // 不同实例的拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptors,
            this.interceptors?.requestInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptors,
            this.interceptors?.responseInterceptorsCatch
        )

        // 每个实例都有的拦截
        this.instance.interceptors.request.use((config) => {
            if (this.showLoading) {
                this.loading?.open()
            }
            return config
        })
        this.instance.interceptors.response.use((res) => {
            setTimeout(() => {
                this.loading?.close()
                // 恢复初始值，单独请求的loading会改变整个实例的loading，所以要恢复
                this.loading = this.recordLoadingInfo
                this.showLoading = this.recordShowLoading
            }, 1000)
            return res
        })
    }
    request<T=AxiosResponse>(config: RequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) =>
        {
            // 每个请求单独设置的loading
            if (config.showLoading) {
                this.showLoading = true
                this.loading = loading(config.showLoading.title, config.showLoading.color)
            }
            // 每个请求各自的拦截
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config)
            }
            this.instance.request<any, T>(config).then(res => {
                // 每个响应各自的拦截
                if(config.interceptors?.responseInterceptors) {
                    res = config.interceptors.responseInterceptors(res)
                }
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    }
    get<T=AxiosResponse>(config: RequestConfig<T>) {
        return this.request<T>({...config, method: 'get'})
    }
    post<T=AxiosResponse>(config: RequestConfig<T>) {
        return this.request<T>({...config, method: 'post'})
    }
    delete<T=AxiosResponse>(config: RequestConfig<T>) {
        return this.request<T>({...config, method: 'delete'})
    }
    put<T=AxiosResponse>(config: RequestConfig<T>) {
        return this.request<T>({...config, method: 'put'})
    }
}

export default Request
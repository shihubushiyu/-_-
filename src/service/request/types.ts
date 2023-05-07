import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//定义一个泛型接口
export interface WTRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err?: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err?: any) => any
}
export interface WTAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: WTRequestInterceptors<T>
  showLoading?: boolean
}

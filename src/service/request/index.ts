import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WTAxiosRequestConfig, WTRequestInterceptors } from './types'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class RWTRequest {
  instance: AxiosInstance
  interceptor?: WTRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance

  constructor(config: WTAxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptor
    this.showLoading = config.showLoading ?? true

    //使用可选链 为某个实例添加拦截器interceptor
    this.instance.interceptors.request.use(
      config.interceptor?.requestInterceptor,
      config.interceptor?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptor?.responseInterceptor,
      config.interceptor?.responseInterceptorCatch
    )

    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例发出的请求都会被拦截')
        //判断this.showloading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '正在加载中....',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // setTimeout(() => {
        this.loading?.close()
        // }, 3000)
        // console.log('所有实例响应成功被拦截')
        const data = res.data
        return data
      },
      (err) => {
        // console.log('所有实例的响应失败的拦截器：响应失败')
        this.loading?.close()
        if (err.response.status == 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  //拦截器的本质就是监听到你所请求的url
  request<T>(config: WTAxiosRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestInterceptor) {
        // 根据你调用你这个reuqest方法传入拦截器函数来对请求做出监视
        config = config.interceptor.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptor?.responseInterceptor) {
            // 根据你调用你这个reuqest方法传入拦截器函数来对响应做出监视
            res = config.interceptor.responseInterceptor(res)
          }
          //在请求结束将showloading的值改回去，不然本实例再次发送请求没有默认的loading加载界面
          this.showLoading = true
          // console.log(res) //执行
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }
  get<T>(config: WTAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T>(config: WTAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }
}
export default RWTRequest

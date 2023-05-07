import RWTRequest from './request'
import { base_url, timeout } from './request/config'

// 这样做的好处是每个实例都有不同的拦截器
export default new RWTRequest({
  baseURL: base_url,
  timeout,
  showLoading: true //默认都开启加载界面；可以通过给请求request赋值来改变这种默认模式
  // interceptor: {
  //   requestInterceptor(config) {
  //     console.log('请求成功的拦截')
  //     return config
  //   },
  //   requestInterceptorCatch() {
  //     console.log('请求发送失败')
  //   },
  //   responseInterceptor(res) {
  //     console.log('响应成功的拦截')
  //     return res
  //   },
  //   responseInterceptorCatch() {
  //     console.log('响应失败')
  //   }
  // }
})

import axios from 'axios'

//axios的实例
axios.defaults.baseURL = ''

//axios拦截器
/* 
1.请求拦截器：
    fn1:在发送请求之前做些什么；
    fn2:对请求错误做些什么;
*/
axios.interceptors.request.use(
  function fn1(config) {
    console.log(config)
    return config
  },
  function fn2() {
    console.log('请求失败')
  }
)

/* 
1.响应拦截器：
    fn1:服务器正常返回时候执行的函数；
    fn2:对响应错误做点什么;
*/
axios.interceptors.response.use(
  function fn1(res) {
    console.log(res)
    return res.data
  },
  function fn2() {
    console.log('响应失败')
  }
)

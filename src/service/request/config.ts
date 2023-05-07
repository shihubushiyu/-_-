// 根据process.env.NODE_ENV的值来使base_url成为不同的值

let base_url = ''
const timeout = 10000
if (process.env.NODE_ENV === 'development') {
  base_url = '/api'
} else if (process.env.NODE_ENV === 'production') {
  base_url = '/api'
} else if (process.env.NODE_ENV === 'test') {
  base_url = '/api'
}

export { base_url, timeout }

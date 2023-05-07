class LocalCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    // 当获取不存在的key时候会返回null
    const val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
  }
  deleteCache(key: string) {
    localStorage.removeItem(key)
  }
  // 清空所有缓存
  clearCache() {
    localStorage.clear()
  }
}
export default new LocalCache()

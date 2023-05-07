import { defineStore } from 'pinia'
import RRequest from '../service'
import type { USER, loginTokenData, ImenuData, childrenData, patient } from './type'
import cache from '@/utils/cache'
import router from '../router/index'
import type { RouteRecordRaw } from 'vue-router'
import type { getBedType } from '../views/main/mainViews/types'
import type { bedDataInterface } from '../views/main/mainViews/types'

export const useMainStore = defineStore('Main', {
  state() {
    return {
      token: 'asd',
      userMenus: [] as ImenuData<childrenData>[],
      isCollapse: false,
      routeArr: [] as RouteRecordRaw[],
      tabData: [{ path: 'home', name: 'home', label: '首页', icon: 'home' }] as childrenData[],
      registData: {
        id: '',
        name: '',
        sex: '',
        sf: '',
        date: '',
        cardId: '',
        doctor: '',
        address: '',
        phone: '',
        textarea: '',
        isHospital: '',
        money: 100
      },
      patientDataID: { id: 0, name: '', useDrug: '', DateDrug: '' } as patient,
      chargeQueryData: [] as bedDataInterface[]
    }
  },
  actions: {
    async login(account: USER) {
      // console.log('@@woshilogin')
      //这里使用的接口，如果有泛型，则必须传值；如果泛型有默认值，则可传可不传。
      const tokenData = await RRequest.post<loginTokenData<ImenuData<childrenData>>>({
        url: '/login',
        data: account
      })
      // console.log(tokenData) //获取token成功
      this.token = tokenData.token
      cache.setCache('token', this.token)
      // 缓存asideMenu
      this.userMenus = tokenData.menuDate
      cache.setCache('userMenus', this.userMenus)

      // console.log(this.tabData)
      cache.setCache('tabData', this.tabData)
      this.mainCachePinia() //此处使用this.mainCachePinia是因为登录页面没有刷新，所以没有执行mainCachePinia函数，此时没有动态添加路由，所以在此调用一次。
      router.push({ path: '/main' })
    },
    //永久化存储state
    mainCachePinia() {
      const bedData = cache.getCache('bedData')
      if (bedData) {
        this.chargeQueryData = bedData
      }

      const token = cache.getCache('token')
      if (token) {
        this.token = token
      }
      const userMenus = cache.getCache('userMenus')
      if (userMenus) {
        this.userMenus = userMenus
      }

      const routeArr: RouteRecordRaw[] = []
      this.userMenus.forEach((item) => {
        item.children.forEach((itemChildren) => {
          routeArr.push({
            path: itemChildren.path.slice(1),
            name: itemChildren.name,
            component: () => import(`../views/main/mainViews/${itemChildren.name}.vue`)
          })
        })
      })
      // console.log(routeArr)
      //动态添加到路由
      routeArr.forEach((item) => {
        router.addRoute('main', item)
      })
      this.routeArr = routeArr

      //全局订阅state
      this.$subscribe((mutation, state) => {
        cache.setCache('tabData', state.tabData)
        cache.setCache('patientDataID', state.patientDataID)
      })
      // try {
      const tabData = cache.getCache('tabData')
      // console.log('@@', tabData)
      if (tabData) {
        this.tabData = tabData
      }

      const patientDataID = cache.getCache('patientDataID')
      if (patientDataID) {
        this.patientDataID = patientDataID
      }
      // } catch (error) {
      //   //
      // }
    },
    openDialog(patientData: getBedType) {
      this.patientDataID.id = patientData.id
      this.patientDataID.name = patientData.name
    },
    setBedQuery(bedData: bedDataInterface[]) {
      //
      cache.setCache('bedData', bedData)
      this.chargeQueryData = cache.getCache('bedData')
    }
  }
})

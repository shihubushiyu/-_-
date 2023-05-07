//定义data的接口
export interface USER {
  user: string
  password: string
}
export interface childrenData {
  path: string
  name: string
  label: string
  icon: string
}
export interface ImenuData<T> {
  icon: string
  label: string
  children: T[]
}
//定义登录返回后的接口
export interface loginTokenData<T = any> {
  code: number
  message: string
  token: string
  menuDate: T[]
}

export interface patient {
  id: number
  name: string
  useDrug: string
}
// export interface IuserMenus {

// }

// class LoginTokenData implements loginTokenData {
//   code: number
//   message: string
//   token: string
//   menuDate: string
//   constructor(code: number, message: string, token: string, menuDate: string) {
//     this.code = code
//     this.message = message
//     this.token = token
//     this.menuDate = menuDate
//   }
// }
// const a: LoginTokenData = {
//   code: 2,
//   message: '',
//   token: 'st',
//   menuDate: '213'
// }
// console.log(a.code)

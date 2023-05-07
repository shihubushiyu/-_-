export interface getTableType {
  id: string
  name: string
  sex: string
  sf: string
  date: string
  cardId: string
  phone: string
  doctor: string
  isHospital: string
  address: string
  textarea: string
  money: number
  useDrug?: string
}
export interface getBedType {
  id: number
  name: string
  hasPerson: string
  useDrug: string
  //  money: string
}

export interface getTableTypePlus {
  // id: { val: string; iconStyle: string }
  姓名: { val: string; iconStyle: string; useDrug?: string }
  性别: { val: string; iconStyle: string }
  身份证号: { val: string; iconStyle: string }
  挂号时间: { val: string; iconStyle: string }
  卡号: { val: string; iconStyle: string }
  手机号码: { val: string; iconStyle: string }
  主治医师: { val: string; iconStyle: string }
  是否住院: { val: string; iconStyle: string }
  家庭住址: { val: string; iconStyle: string }
  诊断意见: { val: string; iconStyle: string }
  卡余额: { val: number; iconStyle: string }
  医嘱?: { val: string; iconStyle: string }
}

export interface user {
  value: string | number
  iconStyle: string
}

export interface bedDataInterface {
  id: number
  name: string
  hasPerson: string
  useDrug: string
  DateDrug: string
  money: string
}

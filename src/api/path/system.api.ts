import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { LoginResult } from './system'

// * 登录
export const loginApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<LoginResult>(`${ModuleTypeEnum.SYSTEM}/user/login`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * token登录
export const tokenLoginApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/user/token_login`, data);
    return res;
  } catch(err) {
    httpErrorHandle();
  }
}

// * 登出
export const logoutApi = async () => {
  try {
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/user/logout`)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * 获取 oss 上传接口
export const ossUrlApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<{
      /**
       * bucket 地址
       */
      bucketURL?: string
    }>(`${ModuleTypeEnum.PROJECT}/getOssInfo`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

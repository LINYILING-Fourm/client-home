import request from '@/utils/request'

// 登录、
export const login = (data: any) =>
    request({
      'url': '/employee/login',
      'method': 'post',
      data
    })
    // 退出
   export const userLogout = (params: any) =>
   request({
     'url': `/employee/logout`, // 授课老师接口
     'method': 'post',
     params
   })



   // 修改页面反查详情接口
export const queryEmployeeById = (id: string | (string | null)[]) => {
    return request({
      url: `/employee/${id}`,
      method: 'get'
    })
  }


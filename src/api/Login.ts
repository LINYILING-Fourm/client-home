
import axios from 'axios';

// 发送验证码的 API 请求
export function sendVerificationCode(email: string): Promise<any> {
  // 发送验证码请求
  return axios.post(
    '/user/sendMsg',
    { email }
  )
    .then(response => {
      return response.data; // 返回后端响应的数据
    })
    .catch(error => {
      throw new Error('发送验证码失败，请重试。'); // 处理发送验证码失败的情况
    });
}

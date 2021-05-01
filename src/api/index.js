import axios from 'axios'
//phone登录
export const reqPhoneLogin = ({ phone, password}) =>axios.post('/login/cellphone', { phone, password, timestamp:Date.now() })

const axios = require('axios')
export function request(config) {
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })
  instance.interceptors.response.use(res=>{				//拦截响应
    // console.log(res)
    res.data   //一般前端需要使用的就是这个data
    return res.data  //我们这边还回去的时候 一般是还回data就可以了
  },err=>{
    console.log(err)
  })
  return instance(config)
}
//axios拦截器
// instance.interceptors.request.use(config=>{  //拦截请求
//   console.log(config)
//   return config   //这边一定要先还回去 要不会被拦截下来
// },err=>{
//   console.log(err)
// })

export function debounce(fun,delay) {
  let timer = null
  return (...args)=>{   // 返回的这个函数是带参数的 args 可以传递任意参数
    if (timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fun.apply(this,args)		//这里是函数的时候 防抖函数是这么用的  里面如果是方法就更简单了。
    },delay)
  }
}

export function formatDate(date,fmt) {
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+' : date.getMonth() + 1,
    'd+' : date.getDate(),
    'h+' : date.getHours(),
    'm+' : date.getMinutes(),
    's+' : date.getSeconds()
  }
  for (let k in o){
    if (new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length=== 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

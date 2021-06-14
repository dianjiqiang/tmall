import Toast from "./Toast";
import {createApp} from 'vue'

const obj = {}

obj.install = vue=>{
  console.log(createApp);
  // //01.创建一个组件构造器
  // const toastConstructor = vue.extend(Toast)
  // //02.new的方式,分局组件构造器,可以创建一个组件对象
  // const toast = new toastConstructor()
  // //03.将组件对象,手动挂载到某一个元素上
  // toast.$mount(document.createElement('div'))
  // //04.toast.$el对应的就是上面对应的div了
  // document.body.appendChild(toast.$el)
  vue.prototype.$toast = Toast;
}

export default obj

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填,  用于调试
    pages: ['^pages/index/main','pages/sharePage/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '发起',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "selectedColor": "#A3CEFB",
      "borderStyle":'white',
      "list": [
        {
          "text":"发起",
          "pagePath":"pages/index/main",
          "iconPath":"static/tab/start.png",
          "selectedIconPath":"static/tab/statrActive.png"
        },
        {
          "text":"我的目标",
          "pagePath":"pages/myTarget/main",
          "iconPath":"static/tab/my.png",
          "selectedIconPath":"static/tab/myActive.png"
        },
        {
          "text":"我的监督",
          "pagePath":"pages/mySupervise/main",
          "iconPath":"static/tab/watch.png",
          "selectedIconPath":"static/tab/watchActive.png"
        },
      ]
    }
  }

}

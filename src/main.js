import Vue from 'vue'
import App from './App'
import config from './config'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$oss=config.ossroot
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填,  用于调试
    pages: ['^pages/index/main', 'pages/sharePage/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '发起',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "selectedColor": "#A3CEFB",
      "borderStyle": 'white',
      "list": [
        {
          "text": "发起",
          "pagePath": "pages/index/main",
          "iconPath": "static/tab/start.png",
          "selectedIconPath": "static/tab/statrActive.png"
        },
        {
          "text": "我的目标",
          "pagePath": "pages/myTarget/main",
          "iconPath": "static/tab/my.png",
          "selectedIconPath": "static/tab/myActive.png"
        },
        {
          "text": "我的监督",
          "pagePath": "pages/mySupervise/main",
          "iconPath": "static/tab/watch.png",
          "selectedIconPath": "static/tab/watchActive.png"
        },
      ]
    }
  },
  onLaunch() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })

  }

}

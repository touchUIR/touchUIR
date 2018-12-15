//app.js

const AV = require('./libs/leancloud-storage.js');


AV.init({
  appId: '',
  appKey: ' ',
});
// 初始化即时通讯 SDK
//const realtime = new Realtime({
  //appId: '0B2nOcDKgJcrvPRFurBtmn6n-gzGzoHsz',
 // appKey: 'nsJpAV0aYanOWiuN7JHz3m3x',
  //plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
//});

App({
  data: {
    infor: '22'

  },
  onLaunch: function () {

    // 展示本地存储能力
   // var logs = wx.getStorageSync('logs') || []
   // logs.unshift(Date.now())
   // wx.setStorageSync('logs', logs)

    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          console.log("fun")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("res" + res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log(777)
          wx.getUserInfo({
            success: res => {
              console.log("res" + res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
    var that = this
    //登陆

   

    AV.User.loginWithWeapp().then(user => {
      that.globalData.user = user.toJSON();
    }).catch(console.error);

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    user: null
  },

  setinf: function (setinf) {

    infor: setinf

  }
})
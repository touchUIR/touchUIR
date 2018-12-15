const AV = require('../../libs/leancloud-storage.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    na: null,
    ph: null,
    dates: null,
    time: null,
    objectroll: null,
    adresult:[],
    user:'',
    active:1,
    netzan:false
  },

  onPullDownRefresh: function () {
    console.log(789)
    //wx.clearStorage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    //获取数据，判断是否要显示点赞功能（相当于吧功能调用放到云端了）
    var zan = new AV.Query('netif');
    zan.equalTo('name', 'netzan')
    // var zan=new AV.Query("netif");
    //query2.startsWith('data')
    zan.find().then(function (rec) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      rec.reverse()
      ///console.log(rec)
      _this.setData({
        netzan: rec[0].attributes.num
      })

    }, function (error) {
    });

    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user,
        userInfo: app.globalData.user,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(1)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
    //登陆
    /*console.log(app.globalData.user)
    //console.log(app.user.attributes.avatarUrl)
    console.log(1)
    AV.User.loginWithWeapp().then(user => {
      app.globalData.user = user.toJSON();
    }).catch(console.error);

    setTimeout(function () {

      console.log(2)
      // 假设已经通过 AV.User.loginWithWeapp() 登录
      // 获得当前登录用户
      const user = AV.User.current();
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({ userInfo }) => {
          // 更新当前用户的信息
          user.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            app.globalData.user = user.toJSON();
          }).catch(console.error);
        }
      });
      console.log(app.globalData)
  
      //要延时执行的代码  
    }, 1000) //延迟时间 这里是1秒 
  */
  },

  getUserInfo: function (e) {
    var _this=this
    const user = AV.User.current();
    user.set(e.detail.userInfo).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息
      app.globalData.user = user.toJSON();
    }).catch(console.error);
    // 调用小程序 API，得到用户信息
    
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      user: e.detail.userInfo,
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      wxname2: this.data.userInfo.nickName
    })
    wx.setStorageSync('wxid2', this.data.userInfo.nickName)
    wx.setStorage({
      key: 'wxsrc2',
      data: this.data.userInfo.avatarUrl,
    })
    var value = wx.getStorageSync('wxid2')
    console.log(111)
    console.log(value)
    this.setData({
      wxname2: value
    })
    // 假设已经通过 AV.User.loginWithWeapp() 登录
    // 获得当前登录用户
   
  },
  tomyyuyue: function () {
    console.log(1)
    wx.navigateTo({
      url: '../myyuyue2/myyuyue2'
    })
  },
  navigateToAdvice:function(){
    wx.navigateTo({
      url: '../ques/ques'
    })
  },
 
  navigateToadd() {
    wx.navigateTo({
      url: '../upnews/upnews'
    })
  },
  navigateToActivity(){
    if (app.globalData) {
      console.log(app.globalData.user.authData.lc_weapp.openid)
      wx.navigateTo({
        url: '../myActivity/myActivity?ima=' + app.globalData.user.avatarUrl + '&na=' + app.globalData.user.nickName + '&ob=' + app.globalData.user.authData.lc_weapp.openid
      })
    } else {
      wx.showModal({
        title: '发生什么了？',
        content: '请登录后查询我的预约  ',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  navigateTolove(){
    if (app.globalData) {
      console.log(app.globalData.user.authData.lc_weapp.openid)
      wx.navigateTo({
        url: '../mylove/mylove?ima=' + app.globalData.user.avatarUrl + '&na=' + app.globalData.user.nickName + '&ob=' + app.globalData.user.authData.lc_weapp.openid
      })
    } else {
      wx.showModal({
        title: '发生什么了？',
        content: '请登录后查询我的预约  ',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  navigateToFankuiAdvice:function(){

    console.log(app.globalData.user)
    if (app.globalData) {
      console.log(app.globalData.user.authData.lc_weapp.openid)
      wx.navigateTo({
        url: '../fankuidetail/fankuidetail?ima=' + app.globalData.user.avatarUrl + '&na=' + app.globalData.user.nickName +'&ob=' + app.globalData.user.authData.lc_weapp.openid
      })
    } else {
      wx.showModal({
        title: '发生什么了？',
        content: '请登录后查询我的预约  ',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  navigateToNet() {
    console.log(app.globalData.user)
    if (app.globalData) {
      console.log(app.globalData.user.authData.lc_weapp.openid)
      wx.navigateTo({
        url: '../mynet/mynet?ima=' + app.globalData.user.avatarUrl + '&na=' + app.globalData.user.nickName + '&ob=' + app.globalData.user.authData.lc_weapp.openid
      })
    } else {
      wx.showModal({
        title: '发生什么了？',
        content: '请登录后查询我的预约  ',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

 
  },
  navigateTo: function () {
    wx.showModal({
      title: '关于我们',
      content: '   指尖国关是国际关系学院网络与教育技术中心、网络文化办公室、国关学生会联合开发的校园微信小程序，公众号搜索“网络文化办公室”或“国关学生会”关注我们.\n合作邮箱：m1395400185@163.com             \n软件作者：最后的卡米夫 \n开源框架：vant（有赞）'  ,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onHide: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(1)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(1)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },
  navigateToMyyuyue: function () {
   // console.log(this.data.userInfo.nickName)
    wx.navigateTo({
      url: '../myyuyue2/myyuyue2?ima=' + app.globalData.user.avatarUrl + '&na=' + app.globalData.user.nickName + '&ob=' + app.globalData.user.authData.lc_weapp.openid
    })
    /*if (this.data.userInfo.nickName){
    wx.navigateTo({
      url: '../myyuyue2/myyuyue2?ima=' + app.globalData.user.avatarUrl + '&na=' + app.globalData.user.nickName + '&ob=' + app.globalData.user.authData.lc_weapp.openid
    })} else {
      wx.showModal({
        title: '发生什么了？',
        content: '请登录后查询我的预约  ',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })}*/
  },

  navigateour: function () {
    wx.showModal({
      title: '疑难解答',
      content: '1.问：为什么我查不到自己的信息和进度了？\n答：您是否授权登陆？若上传信息时未授权，会查不到您的历史信息的\n2.问：不小心点击取消授权或登陆，无法预约怎么办？\n答：您可以在微信小程序列表中删除本程序，然后搜索网络文化办公室，进入即可重新登录 ',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showModal({
            title: '疑难解答',
            content: '1.问：为什么我查不到自己的信息和进度了？\n答：您是否授权登陆？若上传信息时未授权，会查不到您的历史信息的\n2.问：不小心点击取消授权或登陆，无法预约怎么办？\n答：您可以在微信小程序列表中删除本程序，然后搜索网络文化办公室，进入即可重新登录 ',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                      wx.showModal({
                        title: '恭喜你！',
                        content: '恭喜你以耐心成功解锁了本程序的彩蛋！本彩蛋可能造成您手机卡顿，微信崩溃，是否继续？ ',
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')

                            wx.showModal({
                              title: '最后一次反悔机会',
                              content: '当您点击确定后，就会进入彩蛋时间',
                              success: function (res) {
                                if (res.confirm) {
                                  console.log('用户点击确定')
                                  wx.navigateTo({
                                    url: '../flappybird/flappybird' 
                                  })
                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
               
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  navigateToFail: function () {

    //获取用户信息
    console.log(app.globalData)
    var _this = this;
    if (app.globalData.user.admin == true) {
      wx.navigateTo({
        url: '../admintest/admintest'
      })
    } else {
      wx.showModal({
        title: '发生什么了？',
        content: '您不是管理员，无法使用后台管理哦',
        success: function (res) {
          if (res.confirm) { console.log('用户点击确定') }
          else if (res.cancel) { console.log('用户点击取消') }
        }
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '网络文化办公室',
      desc: '国关修电脑哪家强，教学楼二楼开水房',
    }
  },
  sendMessage:function(){ 
  },
  onChange(e) {
    console.log(e.detail);
    if (e.detail == 0) {

      console.log(1)
      wx.redirectTo({
        url: '../index/index'
      })

    } else if (e.detail == 1) {
      wx.redirectTo({
        url: '../my/my',
      })

    }else if(e.detail==2){
      console.log("conss")
    }
  }
})
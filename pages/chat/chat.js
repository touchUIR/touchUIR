
// pages/chat/chat.js
//const AV = require('../../libs/av-weapp-min.js');
var util = require('../../time/time.js');

const AV = require('../../libs/leancloud-storage.js');
const Realtime = require('../../libs/leancloud-realtime.js').Realtime;
const TypedMessagesPlugin = require('../../libs/leancloud-realtime-plugin-typed-messages.js').TypedMessagesPlugin;
const ImageMessage = require('../../libs/leancloud-realtime-plugin-typed-messages.js').ImageMessage;
var { TextMessage } = require('../../libs/leancloud-realtime');


// 初始化即时通讯 SDK
const realtime = new Realtime({
  appId: '0B2nOcDKgJcrvPRFurBtmn6n-gzGzoHsz',
  appKey: 'nsJpAV0aYanOWiuN7JHz3m3x',
  plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
});
console.log(12345)
//var AV = require('leancloud-storage');
//var { Realtime } = require('leancloud-realtime');
// Tom 用自己的名字作为 clientId, 建立长连接，并且获取 IMClient 对象实例




const q=12
const app = getApp()

//var websocket = require('../../utils/websocket.js');

var utils = require('../../utils/util.js');

Page({



  /**
   * 页面的初始数据
   */

  data: {

    newslist: [],

    userInfo: {},

    scrollTop: 0,

    increase: false, //图片添加区域隐藏

    aniStyle: true, //动画效果

    message: "",

    previewImgList: [],
    objectId:'5bd7f6df808ca4006631f7ae'

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function() {
    var sendMsg = realtime.createIMClient('Tom').then(function (tom) {
      tom.getQuery().equalTo('name', '天南海北聊天室').find(function (conversations) {
        console.log(conversations)
        var chatRoom = conversations[0];// 聊天室对象
      }).catch(console.error);
    })
   // var that = this
   // var AV = require('../../libs/leancloud-storage');
    //var { Realtime } = require('../../libs/leancloud-realtime');
   // var { TextMessage } = require('../../libs/leancloud-realtime');
    

  },

  // 页面卸载

  onUnload() {

    wx.closeSocket();

    wx.showToast({

      title: '连接已断开~',

      icon: "none",

      duration: 2000

    })

  },

  //事件处理函数

  sends: function() {

    var flag = this

    if (this.data.message.trim() != "") {

      wx.showToast({

        title: '消息不能为空哦~',

        icon: "none",

        duration: 2000

      })

    } else {
      const that = this;
      console.log("send this.curConversation", q);
      //console.log(sendMsg)
     /* wx.request({
        url: 'https://0b2nocdk.api.lncld.net/1.2/rtm/chatrooms/5bd80fec8d6d810068bb60c8/messages', //仅为示例，并非真实的接口地址
        data: {
          "from_client": "",
          "message": "1111111111111111111111111111"
         
        },
        header: {
          'content-type': 'application/json', // 默认值
          'X-LC-Id': "0B2nOcDKgJcrvPRFurBtmn6n-gzGzoHsz" ,
          'X-LC-Key': "bPdOc8Jvz1d6QBhNLOgESrF2,master" ,
          'Content-Type': "application/json" ,
        },
        success(res) {
          console.log(res.data)
        }
      })*/

      sendMsg.then(function (conversation) {
       //var message=new AV.TextMessage(msg) ;
        return conversation.send(new TextMessage('下半场中国队肯定要做出人员调整'));
      })


     // conversation.send(new TextMessage('耗子，起床！'));
   

      /*setTimeout(function() {

        flag.setData({

          increase: false

        })

      }, 500)

      websocket.send('{ "content": "' + this.data.message + '", "date": "' + utils.formatTime(new Date()) + '","type":"text", "nickName": "' + this.data.userInfo.nickName + '", "avatarUrl": "' + this.data.userInfo.avatarUrl + '" }')

      this.bottom()*/

    }

  },

  //监听input值的改变

  bindChange(res) {

    this.setData({

      message: res.detail.value

    })

  },

  cleanInput() {

    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值

    this.setData({

      message: this.data.message

    })

  },

  increase() {

    this.setData({

      increase: true,

      aniStyle: true

    })

  },

  //点击空白隐藏message下选框

  outbtn() {

    this.setData({

      increase: false,

      aniStyle: true

    })

  },

  //发送图片

  chooseImage() {

    var that = this

    wx.chooseImage({

      count: 1, // 默认9

      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function(res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        var tempFilePaths = res.tempFilePaths

        // console.log(tempFilePaths)

        wx.uploadFile({

          url: 'http://.....', //服务器地址

          filePath: tempFilePaths[0],

          name: 'file',

          headers: {

            'Content-Type': 'form-data'

          },

          success: function(res) {

            if (res.data) {

              that.setData({

                increase: false

              })

              websocket.send('{"images":"' + res.data + '","date":"' + utils.formatTime(new Date()) + '","type":"image","nickName":"' + that.data.userInfo.nickName + '","avatarUrl":"' + that.data.userInfo.avatarUrl + '"}')

              that.bottom()

            }

          }

        })

      }

    })

  },

  //图片预览

  previewImg(e) {

    var that = this

    //必须给对应的wxml的image标签设置data-set=“图片路径”，否则接收不到

    var res = e.target.dataset.src

    var list = this.data.previewImgList //页面的图片集合数组

    //判断res在数组中是否存在，不存在则push到数组中, -1表示res不存在

    if (list.indexOf(res) == -1) {

      this.data.previewImgList.push(res)

    }

    wx.previewImage({

      current: res, // 当前显示图片的http链接

      urls: that.data.previewImgList // 需要预览的图片http链接列表

    })

  },

  //聊天消息始终显示最底端

  bottom: function() {

    var query = wx.createSelectorQuery()

    query.select('#flag').boundingClientRect()

    query.selectViewport().scrollOffset()

    query.exec(function(res) {

      wx.pageScrollTo({

        scrollTop: res[0].bottom // #the-id节点的下边界坐标

      })

      res[1].scrollTop // 显示区域的竖直滚动位置

    })

  },

})
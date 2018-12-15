const app = getApp()
const AV = require('../../libs/leancloud-storage.js');

//index.js
//获取应用实例

Page({
  data: {
    tempFilePaths: '',
    animationData: {},
    cardInfoList: [{
      cardUrl: 'http://lc-0B2nOcDK.cn-n1.lcfile.com/9759eaa7589616646a6b.jpg',
      cardInfo: {
        cardTitle: '我们的故事',
        cardInfoMes: ['纵时光匆匆，思念不减', '此去经别，待何年相见，匆匆', '此生最美的回忆，莫过于遇见你']
      }
    }, {
        cardUrl: 'http://lc-0B2nOcDK.cn-n1.lcfile.com/c483e2b672cceb7b1ad2.jpg',
      cardInfo: {
        cardTitle: '我与你',
        cardInfoMes: ['三年又三年，我们的故事', '纵隔千山万水，心在一起', '最美的女神，最美的你']
      }
    }, {
        cardUrl: 'http://lc-0B2nOcDK.cn-n1.lcfile.com/83bb67017f2c899172ff.jpg',
      cardInfo: {
        cardTitle: '一生一世',
        cardInfoMes: ['若我们在一起有时间，那便是永远', '相思是永远。永远的你与我', '回首相望，我们在这里']
      }
    }]
  },
  //事件处理函数
  slidethis: function (e) {
    console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(-420).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  buythis: function (e) {
    console.log(e);
    app.buyDetail = this.data.cardInfoList[e.target.id];
    wx.navigateTo({
      url: '../detail/detail'
    });
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  },

buythis: function (e){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePath = res.tempFilePaths[0];
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then(
        file => console.log(file.url())
        ).catch(console.error);
    }
  });
}

})

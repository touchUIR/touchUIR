const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')
// pages/mynet/mynet.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allQues: [],
    image: null,
    name: null,
    zhuangtai: '您还没有反馈记录',
    adress: '无',
    telphone: '无',
    detail: '无',
    replay: '暂无回复',
    leixing: '无',
    Quesdata: [],
    Ques1: [],
    index: 0,
    length: 0,
    newlist: null,
    choose: null,
    choosenum: null,
    objectid1: null,
    objectid2: null,
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
    startf: false,
    NetObject:'无',
    QuesObject: '无'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    if (app.globalData.user == null) {

      wx.showModal({
        title: '发生什么了？',
        content: '您的登陆状态失效，请重新登陆',
        success: function (res) {
          if (res.confirm) { console.log('用户点击确定') }
          //返回主页
          else if (res.cancel) { console.log('用户点击取消') }
        }

      })
    }
    this.setData({
      image: options.ima,
      name: options.na,
      objectid1: options.ob
    })
    console.log(123)
    console.log(options.ob)
    console.log(456)


    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });

    var _this = this;
    //综合反馈
    var query = new AV.Query('net');
    query.equalTo('openid', this.data.objectid1)
    query.find().then(function (query) {
      _this.setData({
        allQues: query,
      })
      console.log(_this.data.allQues)
      if (query[0]) {
        _this.setData({
          startf: false
        })
      }
      else {
        _this.setData({
          startf: true
        })
      }
      var arr = _this.data.allQues;
      for (var i = 0, len = arr.length; i < len; i++) {
        console.log(arr[i].createdAt);//遍历输出
        _this.data.Ques1[i] = arr[i].createdAt;
        //console.log(111)
      }
      _this.setData({
        Quesdata: _this.data.Ques1,
        length: arr.length,
        newlist: arr.length - 1
      })
      _this.setData({
        adress: query[_this.data.length - 1].attributes.adress,
        telphone: query[_this.data.length - 1].attributes.telphone,
        //detail: query[_this.data.length - 1].attributes.detail,
        NetObject: query[_this.data.length - 1].attributes.NetObject,
        QuesObject: query[_this.data.length - 1].attributes.QuesObject,
        zhuangtai: query[_this.data.length - 1].attributes.zhuangtai,
        replay: query[_this.data.length - 1].attributes.huifu,
        objectid2: query[_this.data.length - 1].id,
        star: query[_this.data.length - 1].attributes.score,
        detail: query[_this.data.length - 1].attributes.detail
      })

      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
    }, function (error) {
      // 异常处理
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange: function (e) {
    //更新内容
    //console.log(e.detail.value)
    this.setData({
      choosenum: e.detail.value,
      choose: this.data.Quesdata[e.detail.value],
      // QuesObject: this.data.objectArrayQuesObject[e.detail.value]

    })
    //强制类型转换
    this.data.choosenum = parseInt(this.data.choosenum) + 1
    this.setData({
      length: this.data.choosenum
    })
    //console.log(this.data.length)
    var _this = this
    var query = new AV.Query('net');
    query.equalTo('createdAt', this.data.choose)
    query.find().then(function (query) {
      _this.setData({
        allQues: query,
      })
      console.log(query[0])
   
      _this.setData({
        adress: query[0].attributes.adress,
        telphone: query[0].attributes.telphone,
        detail: query[0].attributes.detail,
        NetObject: query[0].attributes.NetObject,
        QuesObject: query[0].attributes.QuesObject,
        //leixing: query[0].attributes.leixing,
        zhuangtai: query[0].attributes.zhuangtai,
        replay: query[0].attributes.huifu,
        objectid2: query[0].id,
        star: query[0].attributes.score
      })
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
    }, function (error) {
      // 异常处理
    });
  },
  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
    var _this = this;

    // 第一个参数是 className，第二个参数是 objectId
    var all = AV.Object.createWithoutData('net', this.data.objectid2);
    //console.log(that.data.itemList2[res.tapIndex])
    // 修改属性
    all.set('score', this.data.star);
    // 保存到云端
    all.save();
    wx.showToast({
      title: '评分成功',
      icon: 'success',
      duration: 2000
    })
  }

})
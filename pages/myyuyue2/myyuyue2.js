const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:null,
    name:null,
    jindu:null,
    realname: '无',
    phone: '无',
    data: '无',
    time: '无',
    fixObject: '无',
    zhuangtai:'您还没有预约过',
    openid:null,
    Quesdata: [],
    objectid2: null,
    allQues:[],
    startf: false,
    Ques1:[],
    length:0,
    newlist:null,
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
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
      zhuangtai: '您还没有预约过',
      openid:options.ob
    })
    console.log(this.data.openid)
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });

    var _this = this;
    //维修预约
    var query = new AV.Query('yuyue');
    query.equalTo('openid', this.data.openid)
    query.find().then(function (query) {
      console.log(query)
      _this.setData({
        allQues:query,
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
      var arr=_this.data.allQues;
      for(var i=0,len=arr.length;i<len;i++){
        console.log(arr[i].attributes.date);
        _this.data.Ques1[i] = arr[i].attributes.date;
      }

_this.setData({
  Quesdata: _this.data.Ques1,
  length: arr.length,
  newlist: arr.length - 1
})

      _this.setData({
        realname: query[_this.data.length - 1].attributes.name,
        phone: query[_this.data.length - 1].attributes.phone,
        data: query[_this.data.length - 1].attributes.date,
        time: query[_this.data.length - 1].attributes.time,
        fixObject: query[_this.data.length - 1].attributes.object,
        zhuangtai: query[_this.data.length - 1].attributes.zhuangtai,
        star: query[_this.data.length - 1].attributes.score,
       objectid2: query[_this.data.length - 1].id,
     
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
    var query1 = new AV.Query('yuyue');
    query1.equalTo('date', this.data.choose)
    var query2 = new AV.Query('yuyue');
    query2.equalTo('openid', this.data.openid)
    var query = AV.Query.and(query1, query2);


    query.find().then(function (query) {
      _this.setData({
        allQues: query,
      })
      console.log(query[0].attributes.score)
      _this.setData({
        realname: query[0].attributes.name,
        phone: query[0].attributes.phone,
        data: query[0].attributes.date,
        time: query[0].attributes.time,
        fixObject: query[0].attributes.object,
        zhuangtai: query[0].attributes.zhuangtai,

       // Quesdata: _this.data.Ques1,
       // length: arr.length,
        //newlist: arr.length - 1,

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
    var all = AV.Object.createWithoutData('yuyue', this.data.objectid2);
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
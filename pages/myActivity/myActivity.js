// page/detail/detail.js
const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')

const app = getApp()

Page({
  data: {
    //allQues: [],
    image: null,
    name: null,
    zhuangtai: '您还没有发布记录',
    maincon: '无',
    main:'无',
    beginday:'',
    begintime: '',
    endday: '',
    begintime: '',
    //ques: '无',
    //ans: '无',
    // adress: '无',
    //phone: '无',
    // detail: '无',
    //replay: '暂无回复',
    // leixing: '无',
    Quesdata: [],
    Ques1: [],
    index: 0,
    length: 0,
    //newlist: null,
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
    activityList: [],
   // peiduionoff: '',
  },
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
      objectid1: options.ob//openid
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
    var query = new AV.Query('activity');
    query.descending('createdAt');
    query.equalTo('openid', this.data.objectid1)
    query.find().then(function (query) {
      _this.setData({
        activityList: query,
        //colornum: allQues.length,
        //hidden: true,
      })
      var length = query.length
      // console.log(_this.data.colornum)
      var fm = new Array(length);
      for (var i = 0; i < length; i++) {
        fm[i] = query[i].attributes
        var date = new Date(query[i].createdAt.toString());
        var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        fm[i].creattime = date_value
        _this.data.Quesdata[i] = date_value
        //console.log(1)
        //console.log(fm[i])
      }
      _this.setData({
        activityList: fm
      })
      if (query[0]) {
        _this.setData({
          startf: false
        })
      }
      else {
        _this.setData({
          startf: true
        })
      }//判断是由配对
      _this.setData({
        maincon: fm[0].maincon,
        main: fm[0].main,
        beginday: fm[0].up_date,
        begintime: fm[0].up_time,
        endday: fm[0].end_date,
        endtime: fm[0].end_time,
        tel: fm[0].tel,
   //    zhuangtai: fm[0].zhaungtai,
        Quesdata: _this.data.Quesdata,
       // peiduionoff: fm[0].peiduionoff,
        //liuyan: fm[0].liuyan
      })//主页信息初始化


    }, function (error) {
      // 异常处理
    });



  },
  onReady: function () {
    // 页面渲染完成


  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  bind: function () {
  },
  bindPickerChange: function (e) {
    var _this = this
    console.log(e)
    //更新内容
    //console.log(e.detail.value)
    this.setData({
      choosenum: e.detail.value,//索引
      choose: this.data.Quesdata[e.detail.value],//数据
      // QuesObject: this.data.objectArrayQuesObject[e.detail.value]

    })
    this.setData({
    

      maincon: _this.data.activityList[e.detail.value].maincon,
      main: _this.data.activityList[e.detail.value].main,
      tel: _this.data.activityList[e.detail.value].tel,
      beginday: _this.data.activityList[e.detail.value].up_date,
      begintime: _this.data.activityList[e.detail.value].up_time,
      endday: _this.data.activityList[e.detail.value].end_date,
      endtime: _this.data.activityList[e.detail.value].end_time,
      //zhuangtai: _this.data.lovelist[e.detail.value].zhaungtai,
      //startf: _this.data.lovelist[e.detail.value].peiduionoff,
      //peiduionoff: _this.data.lovelist[e.detail.value].peiduionoff,
      //liuyan: _this.data.lovelist[e.detail.value].liuyan
    })

  },
  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
    var _this = this;

    // 第一个参数是 className，第二个参数是 objectId
    var all = AV.Object.createWithoutData('activity', this.data.objectid2);
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
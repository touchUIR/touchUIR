const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')
import Dialog from '../../dist/dialog/dialog';
var app = getApp();
import Toast from '../../dist/toast/toast';
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //有关图片
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    imagebase64: 'http://lc-0b2nocdk.cn-n1.lcfile.com/03e34dce0ea98c001037.jpg',
//基础信息
    act_dates:'未选择开始日期',
    act_times:'未选择开始时间',
    act_dates_ed: '未选择结束日期',
    act_times_ed: '未选择结束时间',
    userimage:'',
    act_zuzhi:'',
    act_jianjie:'',
    act_detail:'',
    openid:'',
    user_image:'',
    way:'',
    act_biaoqian:''
  },

  //有关图片的函数
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        console.log(that.data.imageList[0])
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src

    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      act_times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      act_dates: e.detail.value
    })
  },
  bindTimeChange_ed: function (e) {
    console.log("谁哦按ed")
    this.setData({
      act_times_ed: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange_ed: function (e) {
    console.log(e.detail.value)
    this.setData({
      act_dates_ed: e.detail.value
    })
  },
  inputWay: function (e) {
    console.log(e)
    this.setData({
      way: e.detail
    })
    //console.log(this.data.phone)
  },
  inputBiaoqian: function (e) {
    console.log(e)
    this.setData({
      act_biaoqian: e.detail
    })
    //console.log(this.data.phone)
  },
  //输入框函数
  inputTelphone: function (e) {
    console.log(e)
    this.setData({
      act_zuzhi: e.detail
    })
    //console.log(this.data.phone)
  },
  inputDetail: function (e) {
    this.setData({
      act_detail: e.detail
    })
    //console.log(this.data.zhuanye)
  },
  inputAdress: function (e) {
    this.setData({
       act_jianjie: e.detail
    })
   // console.log(this.data.adress)
  },
  //提交函数
  updetail(){
    var that=this
    var _this=this
    if (this.data.act_zuzhi == '' || this.data.act_jianjie == '' || this.data.act_detail == '' || this.data.act_dates == '未选择开始日期' || this.data.act_times =='未选择开始时间'){
      Dialog.alert({
        message:"请填写完整信息"
      });

    } else if (_this.data.imageList[0] == null){
      _this.suveuu()
    }else{
      new AV.File('test', {
        blob: {
          uri: _this.data.imageList[0],
        },
      }).save().then(
        file => _this.saveu(file.url()) //console.log(file.url())

      ).catch(console.error);
    }
    //this.suveuu();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.data.openid = app.globalData.user.authData.lc_weapp.openid
   this.data.user_image=app.globalData.user.avatarUrl
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
  suveuu() {
    var _this = this;
    // var file1 = AV.File('test.png', data);
    var actiVity = AV.Object.extend('activity');
    // 新建一个 Todo 对象
    var Act = new actiVity();
    Act.set('maincon', _this.data.act_jianjie);
    Act.set('main', _this.data.act_detail);
    // Ques.set('zhuanye', this.data.zhuanye);
    Act.set('name', _this.data.act_zuzhi);
    Act.set('up_date', _this.data.act_dates);
    Act.set('up_time', _this.data.act_times);
    Act.set('end_date', _this.data.act_dates_ed);
    Act.set('end_time', _this.data.act_times_ed);
    Act.set('tel', _this.data.way);
    Act.set('title_ima_link', _this.data.user_image);
    Act.set('openid', _this.data.openid);
    Act.set('biaoqian', _this.data.act_biaoqian);
    // Ques.set('imagebase64', imgurl);
    Act.save().then(function (Act) {
      wx.showModal({
        title: '提示',
        content: '您的活动已成功发布，感谢您的使用',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: 1
            });

          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.navigateBack({
              delta: 1
            });
          }
        }
      })
      // 成功保存之后，执行其他逻辑.
      console.log('New object created with objectId: ' + Ques.id);
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });
  },
  saveu(imgurl) {
    var _this = this;
    // var file1 = AV.File('test.png', data);
    var actiVity = AV.Object.extend('activity');
    // 新建一个 Todo 对象
    var Act = new actiVity();
    Act.set('maincon', _this.data.act_jianjie);
    Act.set('main', _this.data.act_detail);
    // Ques.set('zhuanye', this.data.zhuanye);
    Act.set('name', _this.data.act_zuzhi);
    Act.set('up_date', _this.data.act_dates);
    Act.set('up_time', _this.data.act_times);
    Act.set('openid', _this.data.openid);
    Act.set('biaoqian', _this.data.act_biaoqian);
    Act.set('imagebase64', imgurl);
    Act.set('end_date', _this.data.act_dates_ed);
    Act.set('end_time', _this.data.act_times_ed);
    Act.set('tel', _this.data.way);
    Act.save().then(function (Act) {
      wx.showModal({
        title: '提示',
        content: '您的活动已成功发布，感谢您的使用',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: 1
            });

          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.navigateBack({
              delta: 1
            });
          }
        }
      })
      // 成功保存之后，执行其他逻辑.
      console.log('New object created with objectId: ' + Ques.id);
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });
  },
})
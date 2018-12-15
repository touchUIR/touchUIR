const AV = require('../../libs/leancloud-storage.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 20,
    focus: false,
    advice:null,
    tel:null,
    useralladvice:null
  },

  inputAdvice: function (e) {
    //console.log(e)
    this.setData({
      advice: e.detail.value
    })

  },
  inputTel: function (e) {
    //console.log(e)
    this.setData({
      tel: e.detail.value
    })
  },
  upAdvice: function (advice, tel) {
    //提交到服务器
    var useradvice = AV.Object.extend('useradvice');
    // 新建一个 Todo 对象
    var usad = new useradvice();
    usad.set('advice', this.data.advice);
    usad.set('tel', this.data.tel);
 
    usad.save().then(function (usad) {
      wx.redirectTo({
        url: '../index/index'
      })
      // 成功保存之后，执行其他逻辑.
      console.log('New object created with objectId: ' + usad.id);
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });
  },

 
})
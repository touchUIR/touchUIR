const AV = require('../../libs/leancloud-storage.js');
var app = getApp();
Page({

  /**
   * 用户初始数据
   */
  data: {
    data:null,
    mname:'未填写',
    mphone:'未填写',
    mdate:null,
    mtime:null,
    mobject:null,
    wxname:null,
    progress:'已接受预约',
    openid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mname: options.name,
      mphone: options.phone,
      mdate: options.date,
      mtime: options.time,
      mobject: options.object,
      wxname: options.wxname,
      openid:options.openid

    })
    console.log(1)
    console.log(this.data.mobject)
    console.log(this.data.wxname)
    console.log(this.data.openid)

    // 提交数据到服务器
   var yuyue = AV.Object.extend('yuyue');
    // 新建一个 Todo 对象
    var todo = new yuyue();
    todo.set('wxname', this.data.wxname);
    todo.set('name', this.data.mname);
    todo.set('phone', this.data.mphone);
    todo.set('date', this.data.mdate);
    todo.set('time', this.data.mtime);
    todo.set('object', this.data.mobject);
    todo.set('zhuangtai',this.data.progress);
    todo.set('openid',this.data.openid)
    todo.save().then(function (todo) {
      // 成功保存之后，执行其他逻辑.
      console.log('New object created with objectId: ' + todo.id);
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });
      
      //微信name
  
      

    
        
  
      
    
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  backToMain:function(){
    console.log('backtomain')
    wx.navigateBack({
      delta: 2
    });

  }

})
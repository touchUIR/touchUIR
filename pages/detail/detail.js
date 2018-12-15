const AV = require('../../libs/leancloud-storage.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:null,
    reason:null,
    way:null,
    titleimage:'http://lc-0b2nocdk.cn-n1.lcfile.com/71ec86369190d4a79124.jpg',
    isshare: 0,

    
  },
  onClickLeft(e){
console.log(e)
if(this.data.isshare==0){
    wx.navigateBack({
      delta: 1
  });
}else{
  this.backHome()
}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isshare == 1) {
      console.log('是分享进入');
      this.setData({
        'isshare': options.isshare
      })
    }
    this.setData({
      title:options.title,
      //reason:options.reason,
      //way:options.way
    })
var _this=this

    //console.log(this.data.serchname)
    var query = new AV.Query('netfixmy');
    query.equalTo('title', this.data.title)
    
    query.find().then(function (netfixmy) {
      console.log(netfixmy)
      _this.setData({
        titleimage: netfixmy[0].attributes.titleimage,
        reason: netfixmy[0].attributes.reason,
        way: netfixmy[0].attributes.way
      })})
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
    return{
      title:this.data.title,
      desc:this.data.reason,
      path:"pages/detail/detail?isshare=1&title=" + this.data.title
    }

  },
  /**
  * 回到首页(分享的时候)
  */
  backHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})
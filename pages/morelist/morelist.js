const AV = require('../../libs/leancloud-storage.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    count: 0,
    list:[],
    hidden: false,
    when:1,
    NetFix:[],
length:''
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.startPullDownRefresh()
   console.log(3)
   
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
  onPullDownRefresh: function (e) {
    // wx.startPullDownRefresh()
  

    console.log(1)
    //this.data.count = 123;
   // wx.stopPullDownRefresh();
    // wx.startPullDownRefresh()
   
    var _this = this;
    //console.log(this.data.serchname)
    var query = new AV.Query('netfixmy');
    query.startsWith('for', '1');
    query.find().then(function (netfixmy) {
      console.log(netfixmy)
      var length = netfixmy.length
      var fm = new Array(length);
      _this.setData({
        NetFix: netfixmy
      })
      for (var i = 0; i < length; i++) {
        fm[i] = _this.data.NetFix[i].attributes
        console.log(fm[i])
      }
      _this.setData({
        list: fm
      })
     // var obj=JSON.parse(netfixmy)
     // console.log(obj)
      
      /*
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      _this.setData({
        NetFix: netfixmy,
        length: netfixmy.length
      })
      var fm = new Array(_this.data.length);
      for (var i = 0; i < _this.data.length; i++) {
        fm[i] = _this.data.NetFix[i].attributes.title
        console.log(fm[i])
      }
      _this.setData({
        list: fm
      })
      console.log(_this.data.NetFix)*/
    }, function (error) {
    });
   
   
      
  },
  onReachBottom() {
   
  },
  to_Daily:function(e){
console.log(e.currentTarget.dataset.id)
    var item = e.currentTarget.dataset.id
    var filrname = this.data.list[item].filename
   
    console.log(filrname)
    console.log(this.data.list[item].date)
    console.log(this.data.list[item].title)
    var title = this.data.list[item].title
    var date = this.data.list[item].date
    var name = filrname
    var visit = this.data.list[item].visitorCount
    //var url = '../daily/daily?title=' + title + '&date=' + date + '&filename=' + name + '&visitorCount=' + visit
    var url = '../daily/daily?filename=' + name + '&visitorCount=' + visit + '&date=' + date+'&title='+title
    console.log(url)
    wx.navigateTo({
      url: url
    })

  } 
})
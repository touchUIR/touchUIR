var url = "https://op.juhe.cn/onebox/basketball/nba";
//为了您的密钥安全，建议使用服务端代码中转请求，事例代码可参考 https://code.juhe.cn/
var apiKey = "a389cf9e0d8b8a635769e00108bde9c7";    //输入自己的key

var newsurl ="https://api01.bitspaceman.com/post/qqsport?baid=69&apikey=ak03g7bq5BqFDJsCAfGKCQ17uLwJBwIfSyqgmT3eJHw9cz1BJJiOW86Yieq6RWm9 ";
//var newsKey ="ak03g7bq5BqFDJsCAfGKCQ17uLwJBwIfSyqgmT3eJHw9cz1BJJiOW86Yieq6RWm9";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    restation: [],
    condition: true,
    relist:[],
    
    news:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(123)
    //发起请求，注意 wx.request发起的是 HTTPS 请求
    var that=this
   wx.request({
      url: url + "?station=" + that.data.inputValue + "&key=" + apiKey,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log()
        if (res.data.resultcode =='112'){
          wx.showModal({
            title: '很抱歉',
            content: '而个人资金有限，整套小程序开发维护成本较高，因此只够购买单日限量100次请求的API，今日次数已用完，暂时无法获取比赛数据，为您带来的不便敬请谅解',
            success: function (res) {
            }
          })
        }{
        //res=''
        var data = res.data;
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          restation: data.result,
          condition: false,
          relist:data.result.list
        });
        //数据加载成功后隐藏加载中弹框
        wx.hideToast();
        }
      }
    })

    wx.request({
      url: newsurl,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       
          //res=''
          var data = res.data.data;
          //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
          that.setData({
            news: data,
            //condition: false,
            //relist: data.result.list
          });
          //数据加载成功后隐藏加载中弹框
          wx.hideToast();
        }
      
    })




















    
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
    
  }
})

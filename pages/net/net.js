const app = getApp()
const AV = require('../../libs/leancloud-storage.js');
import Toast from '../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArrayNetObject: ['未选择','有线网（路由器）', 'UIR无线网'],
    objectArrayQuesObject: ['未选择', '无法登陆', '频繁掉线', '网速低', '无线网无法连接', '无线网信号差', '其它（请务必在问题描述中填写）'],
    index1:0,
    index2:0,
    adress:'',
    detail:'',
    telphone:null,
    NetObject:'',
    QuesObject:'',
    stuid:'',
    openid:''
  },

  inputAdress: function (e) {
    //console.log(e)
    this.setData({
      adress: e.detail
    })
  },

//选择函数
  bindPickerChange1: function (e) {
    console.log(e.detail.value)
    this.setData({
      index1: e.detail.value,
      NetObject: this.data.objectArrayNetObject[e.detail.value]

    })
    console.log(this.data.NetObject)
  },
  bindPickerChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      index2: e.detail.value,
      QuesObject: this.data.objectArrayQuesObject[e.detail.value]
    })
  },


  inputDetail: function (e) {
    //console.log(e)
    this.setData({
      detail: e.detail
    })
  },
  inputTelphone: function (e) {
    //console.log(e)
    this.setData({
      telphone: e.detail
    })
  },
  inputStuid:function(e){
    console.log(e)
    this.setData({
      stuid:e.detail
    })

  },


  upnet:function(){
    if (this.data.NetObject == '' || this.data.QuesObject == '' || this.data.NetObject == '未选择' || this.data.QuesObject =='未选择'){
      wx.showModal({
        title: '提示',
        content: '您的网络类型或问题类型未选择哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else if (this.data.adress == null) {
      wx.showModal({
        title: '提示',
        content: '只有填上地址我们的工作人员才能找到你哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (this.data.telphone==null){
      wx.showModal({
        title: '提示',
        content: '只有填上联系方式后我们的工作人员才能找到你哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else if (this.data.stuid == null){
      wx.showModal({
        title: '提示',
        content: '只有填上学号后我们的工作人员才能及时排查网络哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
      else{

      //提交到服务器
      var _this = this;
      var net = AV.Object.extend('net');
      // 新建一个 Todo 对象
      var netd = new net();
      netd.set('adress', this.data.adress);
      netd.set('telphone', this.data.telphone);
      netd.set('detail', this.data.detail);
      netd.set('NetObject', this.data.NetObject);
      netd.set('QuesObject', this.data.QuesObject);
      netd.set('stuid', this.data.stuid);
      netd.set('openid',this.data.openid);

      netd.save().then(function (netd) {

        wx.showModal({
          title: '提示',
          content: '您的意见已提交，感谢您的反馈和对我们的工作的支持，若您留下了联系方式，我们的工作人员可能会联系您，请您保持通话畅通',
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
        console.log('New object created with objectId: ' + netd.id);
      }, function (error) {
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });

    
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    this.data.openid = app.globalData.user.authData.lc_weapp.openid
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
  back() {
    wx.showModal({
      title: '确认',
      content: '你确定不要填写吗？若果您担心信息泄露，可在每晚八点钟前往教学楼二楼水房维修',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateBack({
            delta: 1
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onClickIcon(){
    Toast('根据学号我们才可以定位到问题');
  }
})
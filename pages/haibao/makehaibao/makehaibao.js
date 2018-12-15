Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:null,
    userName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
   // const wxGetImageInfo = promisify(wx.getImageInfo)
    wx.getUserInfo({    //获取微信用户信息
      success: function (res) {
        
        _this.getImageInfo(res.userInfo.avatarUrl);  //  调取图片处理方法
        _this.setData({
          userName: res.userInfo.nickName
        });
      }
    });


  },
  getImageInfo(url) {    //  图片缓存本地的方法
  var _this=this
    if (typeof url === 'string') {
      wx.getImageInfo({   //  小程序获取图片信息API
        src: url,
        success: function (res) {
          _this.setData({
            head_img: res.path
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }},
 
  //先制作一个canvas标签，再保存成图片
  onSaveImg: function () {
    const ctx = wx.createCanvasContext('myCanvas');         //看回wxml里的canvas标签，这个的myCanvas要和标签里的canvas-id一致

    ctx.clearRect(0, 0, 644, 966);
    ctx.drawImage("../../img/test1.png", 0, 0, 646, 966);
    ctx.drawImage("../../img/test2.png", 0, -60, 646, 966);
    ctx.drawImage("../../img/tipsImg" + this.data.tipsImgId + ".png", 79, 291 - 60, 492, 244);
    ctx.drawImage("../../img/test3.jpg", 90, 780 - 60, 135, 135);
    ctx.setFillStyle("#02446e");
    ctx.setFontSize(26);
    ctx.fillText("亲爱的" + this.data.testName + this.data.testId, 100, 610 - 60);
    ctx.setTextAlign("center");
    ctx.fillText("你的有入扔有人不迷", 435, 790 - 60);

    ctx.setTextAlign("left");
    ctx.setFillStyle("black");
    ctx.setFontSize(18);
    ctx.fillText("我等你", 330, 825 - 60);
    ctx.setFontSize(22);

    ctx.drawImage("../../img/test4.png", 0, 936 - 60, 646, 30);
    var self = this;

    ctx.draw(true, setTimeout(function () {     //为什么要延迟100毫秒？大家测试一下
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 646,
        height: 966,
        destWidth: 646,
        destHeight: 966,
        canvasId: 'myCanvas',
        success: function (res) {
          self.data.savedImgUrl = res.tempFilePath;
          self.saveImageToPhoto();
        }
      })
    }, 100))
  },
  //保存图片到相册
  saveImageToPhoto: function () {
    if (this.data.savedImgUrl != "") {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.savedImgUrl,
        success: function () {
          wx.showModal({
            title: '保存图片成功',
            content: '寻人启事已经保存到相册，您可以手动分享到朋友圈！',
            showCancel: false
          });
        },
        fail: function (res) {
          console.log(res);
          if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
            wx.showModal({
              title: '保存图片失败',
              content: '您已取消保存图片到相册！',
              showCancel: false
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
              complete: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.openSetting({})      //打开小程序设置页面，可以设置权限
                } else {
                  wx.showModal({
                    title: '保存图片失败',
                    content: '您已取消保存图片到相册！',
                    showCancel: false
                  });
                }
              }
            });
          }
        }
      })
    }
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
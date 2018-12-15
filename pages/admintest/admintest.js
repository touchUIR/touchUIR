const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    ips: [
      { id: "1", title: "综合反馈", isSelect: true },
      { id: "2", title: "网络反馈", isSelect: false },
      { id: "3", title: "电脑报修", isSelect: false },
      { id: "4", title: "更多（尚在开发中）", isSelect: false },
   
    ],
    ips_daily: [
      { id: "1", title: "已阅读未处理", isSelect: true },
      { id: "2", title: "已阅读并回复", isSelect: false },
      { id: "3", title: "已处理问题", isSelect: false },
    ],
    ips_net:[
      { id: "1", title: "已阅读", isSelect: true },
      { id: "2", title: "已阅读并反馈", isSelect: false },
      { id: "3", title: "已处理", isSelect: false },
    ],
    itemList1: ['已安排维修', '正在维修中', '已完成维修'],
    con:[true,false,false,false],
    Yuyue: [],
    Fankui: [],
    allques: [],
    list:null,
    hiddenmodalput:true,
    hiddenmodalput2:true,
    getid3:null,
    getid2:null,
    getid1:null,
    phone:null,
    //回复弹窗
    daily_replay_con:null,
    daily_zhaungtai: "已阅读未处理",
    details:null,
    //net回复
    net_replay_con:null,
    net_zhaungtai: "已阅读",
    //页码
    daily_page:0,
    net_page:0,
    com_page:0,
  },
  page_update: function (e) {
    console.log(123456)
    var _this = this;
    //console.log(123)
    //综合反馈初始化逻辑
    var query = new AV.Query('allQues');
    query.limit(10);// 最多返回 10 条结果
    //query.descending('createdAt');
    query.descending('createdAt');
    var d_p = this.data.daily_page * 10;
    query.skip(d_p);// 跳过 20 条结果
    //query2.startsWith('data')
    query.find().then(function (allQues) {
      // console.log(666)
      //console.log(allQues)
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //allQues.reverse()
      _this.setData({
        allques: allQues,
        list: allQues
      })
      // console.log(_this.data.allques[0])
      // console.log(_this.data.list)
    }, function (error) {
    });
    //网络反馈初始化逻辑
    var query2 = new AV.Query('net');
    query2.limit(10);// 最多返回 10 条结果
    var n_p = this.data.net_page * 10;
    query2.skip(n_p);// 跳过 20 条结果
    //query.descending('createdAt');
    query2.descending('createdAt');
    //query2.startsWith('data')
    query2.find().then(function (net) {
      console.log(net)
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //net.reverse()
      _this.setData({
        Fankui: net
      })
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });
console.log(_this.data.Fankui)
    //电脑维修查询
    //var _this = this;
    //console.log(this.data.serchname)

    var query3 = new AV.Query('yuyue');
    query3.limit(10);
    var c_p = this.data.com_page * 10;
    query3.skip(c_p);// 跳过 20 条结果
    query3.descending('createdAt');
    //query.startsWith('date', _this.data.time);
    query3.find().then(function (yuyue) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //yuyue.reverse()
      _this.setData({
        Yuyue: yuyue
      })
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });
  },
  /**
     * item点击事件
     */
  onIpItemClick: function (event) {
    //console.log(event);
    var id = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      content: this.data.ips[curIndex].isSelect,
      ips: this.data.ips,
      
    });
   
  },
  //生活部选择
  daily_onIpItemClick: function (event) {
    console.log(event);
    var idd = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips_daily.length; i++) {
      if (idd == this.data.ips_daily[i].id) {
        this.data.ips_daily[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips_daily[i].isSelect = false;
      }
    }

    this.setData({
      daily_zhaungtai: this.data.ips_daily[curIndex].title,
      ips_daily: this.data.ips_daily,

    });
    console.log(this.data.daily_zhaungtai)
  },

  //net选择
 net_onIpItemClick: function (event) {
    console.log(event);
    var iddn = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips_net.length; i++) {
      if (iddn == this.data.ips_daily[i].id) {
        this.data.ips_net[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips_net[i].isSelect = false;
      }
    }

    this.setData({
      net_zhaungtai: this.data.ips_net[curIndex].title,
      ips_net: this.data.ips_net,

    });
    console.log(this.data.net_zhaungtai)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var _this = this;
    //console.log(123)
    //综合反馈初始化逻辑
    var query = new AV.Query('allQues');
   query.limit(10);// 最多返回 10 条结果
   //query.descending('createdAt');
    query.descending('createdAt');
    var d_p=this.data.daily_page*10;
    query.skip(d_p);// 跳过 20 条结果
    //query2.startsWith('data')
    query.find().then(function (allQues) {
    // console.log(666)
      //console.log(allQues)
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //allQues.reverse()
      _this.setData({
        allques: allQues,
        list:allQues
      })
     // console.log(_this.data.allques[0])
     // console.log(_this.data.list)
    }, function (error) {
    });
    //网络反馈初始化逻辑
    var query2 = new AV.Query('net');
    query2.limit(10);// 最多返回 10 条结果
    var n_p = this.data.net_page * 10;
    query2.skip(n_p);// 跳过 20 条结果
    //query.descending('createdAt');
    query2.descending('createdAt');
    //query2.startsWith('data')
    query2.find().then(function (net) {
      console.log(net)
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //net.reverse()
      _this.setData({
        Fankui: net
      })
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });

    //电脑维修查询
    //var _this = this;
    //console.log(this.data.serchname)

    var query3 = new AV.Query('yuyue');
    query3.limit(10);
    var c_p = this.data.com_page * 10;
    query3.skip(c_p);// 跳过 20 条结果
    query3.descending('createdAt');
    //query.startsWith('date', _this.data.time);
    query3.find().then(function (yuyue) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //yuyue.reverse()
      _this.setData({
        Yuyue: yuyue
      })
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });
  },
//以下为报修逻辑
  com_replay:function(e){

      var $data = e.currentTarget.dataset;
      console.log($data)
      this.setData({
        getid1: this.data.Yuyue[$data.id].id
      })
      //console.log(this.data.getid)

      //绑定点击的objectid
      var _this = this;
      //console.log(666)
      wx.showActionSheet({
        itemList: ['已安排维修', '正在维修中', '已完成维修'],
        success: function (res) {
          console.log(res)
          console.log(_this.data.itemList1[res.tapIndex])
          // 第一个参数是 className，第二个参数是 objectId
          var jindu = AV.Object.createWithoutData('yuyue', _this.data.getid1);
          // 修改属性
          jindu.set('zhuangtai', _this.data.itemList1[res.tapIndex]);
          // 保存到云端
          jindu.save().then(function (e) { _this.page_update();});
          
        },
        fail: function (res) {
          console.log(res.errMsg)
        },
        
      })
    
  },
//打电话
  com_call_phone:function(e){
    console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    this.setData({
      phone: this.data.Yuyue[$data.id].attributes.phone
    })
    console.log(this.data.Yuyue[$data.id].attributes.phone)
    if (this.data.phone == null || this.data.phone == "") {
      console.log("phone is null")
      wx.showModal({
        title: '提示',
        content: '该同学未留下电话',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
      })
    }
  },
//删除
  com_delete:function(e){
    var _this = this
    console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    _this.setData({
      // hiddenmodalput: !this.data.hiddenmodalput,
      getid1: _this.data.Yuyue[$data.id].id
    })
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          var tododeco = AV.Object.createWithoutData('yuyue', _this.data.getid1);
          tododeco.destroy().then(function (success) {
            // 删除成功
            wx.showModal({
              title: '提示',
              content: '删除成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  _this.page_update();
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  _this.page_update();
                }
              }
            })
          }, function (error) {
            // 删除失败
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //以下为回复逻辑
  //点击按钮痰喘指定的hiddenmodalput弹出框
  dail_replay: function (e) {
   // console.log(e.currentTarget.dataset);
   console.log(e)
    //console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      getid3: this.data.allques[$data.id].id
    })
 
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      details:null,
      ips_daily: [
        { id: "1", title: "已阅读未处理", isSelect: true },
        { id: "2", title: "已阅读并回复", isSelect: false },
        { id: "3", title: "已处理问题", isSelect: false },
      ],
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    var that = this;
    // console.log(666)
    if (that.data.daily_replay_con == null) {
      wx.showModal({
        title: '提示',
        content: '请输入回复内容',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      // 第一个参数是 className，第二个参数是 objectId
      var all = AV.Object.createWithoutData('allQues', that.data.getid3);
      //console.log(that.data.itemList2[res.tapIndex])
      // 修改属性
      all.set('huifu', that.data.daily_replay_con);
      all.set('zhuangtai', that.data.daily_zhaungtai);
      // 保存到云端
      all.save();
      wx.showModal({
        title: '提示',
        content: '已提交',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              details: null,
              ips_daily: [
                { id: "1", title: "已阅读未处理", isSelect: true },
                { id: "2", title: "已阅读并回复", isSelect: false },
                { id: "3", title: "已处理问题", isSelect: false },
              ],
            })
            console.log('用户点击确定')
            that.page_update();
          } else if (res.cancel) {
            console.log('用户点击取消')
            that.page_update();
            that.setData({
              details: null,
              ips_daily: [
                { id: "1", title: "已阅读未处理", isSelect: true },
                { id: "2", title: "已阅读并回复", isSelect: false },
                { id: "3", title: "已处理问题", isSelect: false },
              ],
            })
          }
        }
      })
    }
    
  },
  //获得输入内容
  bindTextAreaBlur: function (e){
    console.log(e.detail.value)
    this.setData({
      daily_replay_con: e.detail.value
    })
  },
  bindTextAreaBlur2: function (e) {
    console.log(e.detail.value)
    this.setData({
      net_replay_con: e.detail.value
    })},
//以下为拨打电话逻辑
  dail_call_phone:function(e){
    console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    this.setData({
      phone: this.data.allques[$data.id].attributes.phone
    })
    console.log(this.data.allques[$data.id].attributes.phone)
    if (this.data.phone ==null||this.data.phone==""){
      console.log("phone is null")
      wx.showModal({
        title: '提示',
        content: '该同学未留下电话',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.makePhoneCall({
        phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
      })
    }
  },
//以下为删除逻辑
  daily_delete:function(e){
    var _this=this
    console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    _this.setData({
      // hiddenmodalput: !this.data.hiddenmodalput,
      getid3: _this.data.allques[$data.id].id
    })
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          
          var todo = AV.Object.createWithoutData('allQues', _this.data.getid3);
          todo.destroy().then(function (success) {
            // 删除成功
            wx.showModal({
              title: '提示',
              content: '删除成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  _this.page_update();
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  _this.page_update();
                }
              }
            })
          }, function (error) {
            // 删除失败
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
 /**
  * 网络反馈逻辑
  */
//回复逻辑
  net_replay:function(e){
    // console.log(e.currentTarget.dataset);
    console.log(e)
    //console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2,
      getid2: this.data.Fankui[$data.id].id
    })
  },
  //取消按钮
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true,
      details: null,
      ips_net: [
        { id: "1", title: "已阅读未处理", isSelect: true },
        { id: "2", title: "已阅读并回复", isSelect: false },
        { id: "3", title: "已处理问题", isSelect: false },
      ],
    });
  },
  //确认
  confirm2: function () {
    this.setData({
      hiddenmodalput2: true
    })
    var that = this;
    // console.log(666)
    if (that.data.net_replay_con == null) {
      wx.showModal({
        title: '提示',
        content: '请输入回复内容',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      // 第一个参数是 className，第二个参数是 objectId
      var all = AV.Object.createWithoutData('net', that.data.getid2);
      //console.log(that.data.itemList2[res.tapIndex])
      // 修改属性
      all.set('huifu', that.data.net_replay_con);
      all.set('zhuangtai', that.data.net_zhaungtai);
      // 保存到云端
      all.save();
      wx.showModal({
        title: '提示',
        content: '已提交',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              details: null,
              ips_net: [
                { id: "1", title: "已阅读", isSelect: true },
                { id: "2", title: "已阅读并反馈", isSelect: false },
                { id: "3", title: "已处理", isSelect: false },
              ],
            })
            console.log('用户点击确定')
            that.page_update();
          } else if (res.cancel) {
            console.log('用户点击取消')
            that.page_update();
            that.setData({
              details: null,
              ips_net: [
                { id: "1", title: "已阅读", isSelect: true },
                { id: "2", title: "已阅读并反馈", isSelect: false },
                { id: "3", title: "已处理", isSelect: false },
              ],
            })
          }
        }
      })
    }
    
  },

//拨打电话逻辑
  net_call_phone:function(e){
    console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    this.setData({
      phone: this.data.Fankui[$data.id].attributes.telphone
    })
    console.log(this.data.Fankui[$data.id].attributes.telphone)
    if (this.data.phone == null || this.data.phone == "") {
      console.log("phone is null")
      wx.showModal({
        title: '提示',
        content: '该同学未留下电话',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
      })
    }
  },
//删除信息逻辑
  net_delete:function(e){
    var _this = this
    console.log(e.currentTarget.dataset);
    var $data = e.currentTarget.dataset;
    _this.setData({
      // hiddenmodalput: !this.data.hiddenmodalput,
      getid2: _this.data.Fankui[$data.id].id
    })
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          var tododel = AV.Object.createWithoutData('net', _this.data.getid2);
          tododel.destroy().then(function (success) {
            // 删除成功
            wx.showModal({
              title: '提示',
              content: '删除成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  _this.page_update();
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  _this.page_update();
                }
              }
            })
          }, function (error) {
            // 删除失败
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    
  },
  //刷新
  onPullDownRefresh: function (e) {
    console.log(1)
    this.page_update();
    //this.data.count = 123;
    // wx.stopPullDownRefresh();
    // wx.startPullDownRefresh()
  },
  onReachBottom(e) {
    var that = this;
    console.log(e)
    if (this.data.ips[0].isSelect) {

      var daily_begin = this.data.daily_page + 1
      this.setData({
        daily_page: daily_begin,
        hidden: false
      })

      //综合反馈更新逻辑
      var UPDATA = []
      UPDATA = this.data.allques
      var query4 = new AV.Query('allQues');
      query4.limit(10);// 最多返回 10 条结果
      //query.descending('createdAt');
      query4.descending('createdAt');
      var d_p = this.data.daily_page * 10;
      console.log(d_p)
      query4.skip(d_p);// 跳过 20 条结果
      //query2.startsWith('data')
      query4.find().then(function (allQues) {
        console.log(allQues.length)

        if (allQues.length == 0) {
          wx.showToast({
            title: '没有啦',
            icon: 'loading',
            duration: 1000
          })
          that.setData({
            hidden: true,
          })
        } else {
          for (var i = 0; i < allQues.length; i++) {
            UPDATA.push(allQues[i])
          }
          that.setData({
            allques: UPDATA,
            hidden: true
          })
        }
      }, function (error) {
      });
    } else if (this.data.ips[1].isSelect) {
      console.log(2)
      var net_begin = this.data.net_page + 1
      this.setData({
        net_page: net_begin,
        hidden: false
      })

      //网络反馈更新逻辑
      var UPDATA = []
      UPDATA = this.data.Fankui
      var query5 = new AV.Query('net');
      query5.limit(10);// 最多返回 10 条结果
      //query.descending('createdAt');
      query5.descending('createdAt');
      var n_p = this.data.net_page * 10;
      console.log(n_p)
      query5.skip(n_p);// 跳过 20 条结果
      //query2.startsWith('data')
      query5.find().then(function (net) {
        console.log(net.length)

        if (net.length == 0) {
          wx.showToast({
            title: '没有啦',
            icon: 'loading',
            duration: 1000
          })
          that.setData({
            hidden: true,
          })
        } else {
          for (var i = 0; i < net.length; i++) {
            UPDATA.push(net[i])
          }
          that.setData({
            Fankui: UPDATA,
            hidden: true
          })
        }
      }, function (error) {
      });
    } else if(this.data.ips[2].isSelect){
      var _that=this
      console.log(3)
      var com_begin = this.data.com_page + 1
      this.setData({
        com_page: com_begin,
        hidden: false
      })

      //网络反馈更新逻辑
      var UPDATA3 = []
      UPDATA3 = this.data.Yuyue
      console.log(UPDATA3)
      var query6 = new AV.Query('yuyue');
      query6.limit(10);// 最多返回 10 条结果
      //query.descending('createdAt');
      query6.descending('createdAt');
      var c_p = this.data.com_page * 10;
      console.log(c_p)
      query6.skip(c_p);// 跳过 20 条结果
      //query2.startsWith('data')
      query6.find().then(function (yuyue) {
        console.log(yuyue)

        if (yuyue.length == 0) {
          wx.showToast({
            title: '没有啦',
            icon: 'loading',
            duration: 1000
          })
          _that.setData({
            hidden: true,
          })
        } else {
          for (var i = 0; i < yuyue.length; i++) {
            UPDATA3.push(yuyue[i])
          }
          console.log(UPDATA3)
          _that.setData({
            Yuyue: UPDATA3,
            hidden: true
          })
          console.log(_that.data.Yuyue)
        }
      }, function (error) {
      });
    }else{
      console.log(4)
    }
 

  },
 
})


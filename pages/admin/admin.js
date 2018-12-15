const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')
//var util = require('../../utils/util.js'); 
Page({
  data: {
    Yuyue: [],
    Fankui:[],
    allques:[],
    bindhidden: false,
    bindhidden2: false,
    bindhidden3: false,
    look:"查看",
    look2: "查看",
    look3:"查看",
    itemList1: ['已安排维修', '正在维修中', '已完成维修'],
    itemList2: ['已阅读', '已阅读并反馈', '已处理'],
    itemList3: ['已阅读未处理', '已阅读并联系', '已处理问题'],
    getid:null,
    time:null,
    netDetail:"无详情描述",
    netDetail2: "无详情描述",
    getid2:null,
    getid3: null,
    getid4:null,
    lifreplay:[],
    lifreplay2: [],
 
  },

  onLoad: function () {
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });
    //console.log(this.data.time)
    
    var _this = this;
    //console.log(this.data.serchname)

    var query = new AV.Query('yuyue');
    query.startsWith('date', _this.data.time);
    query.find().then(function (yuyue) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      yuyue.reverse()
      _this.setData({
        Yuyue:yuyue
      })
     // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });

    var query2=new AV.Query('net');
    //query2.startsWith('data')
    query2.find().then(function (net) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      net.reverse()
      _this.setData({
        Fankui: net
      })
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function (error) {
    });

    //综合反馈
    var query3 = new AV.Query('allQues');
    //query2.startsWith('data')
    query3.find().then(function (allQues) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      allQues.reverse()
      _this.setData({
        allques: allQues
      })
      console.log(_this.data.allques[0])
    }, function (error) {
    });


  },
  
  
  
  
  //列表函数
  orderManage:function(){
    if (this.data.bindhidden == false){
this.setData({
  bindhidden:"true",
  look:"收起"
      })
    } else {
      this.setData({
        bindhidden: false,
        look: "查看"
      })}
  },
  orderManage2:function(){
    if (this.data.bindhidden2 == false) {
      this.setData({
        bindhidden2: true,
        look2: "收起"
      })
    } else {
      this.setData({
        bindhidden2: false,
        look2: "查看"
      })
    }
  },
  orderManage3: function () {
    if (this.data.bindhidden3 == false) {
      this.setData({
        bindhidden3: true,
        look3: "收起"
      })
    } else {
      this.setData({
        bindhidden3: false,
        look3: "查看"
      })
    }
  },



edit:function(e){
  var $data = e.currentTarget.dataset;
  console.log($data)
  this.setData({
    getid: this.data.Yuyue[$data.id].id
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
      var jindu = AV.Object.createWithoutData('yuyue', _this.data.getid);
      // 修改属性
      jindu.set('zhuangtai', _this.data.itemList1[res.tapIndex]);
      // 保存到云端
     jindu.save();
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })
},
detail: function (e) {

  var $data2 = e.currentTarget.dataset;
  //console.log($data2)
  //console.log(this.data.Fankui[$data2.id])
  //this.setData({
  // getid2: this.data.Fankui[$data2.id].id
  //})
  //console.log(this.data.getid2)
  this.setData({
    netDetail: this.data.Fankui[$data2.id].attributes.detail
  })
  console.log(this.data.netDetail)
  wx.showModal({
    title: '详情',
    content: this.data.netDetail,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},

detail2: function (e) {
  console.log(e.currentTarget.dataset)
  var $data3 = e.currentTarget.dataset;
  console.log(this.data.allques[$data3.id].attributes.xiangqing)
  this.setData({
    netDetail2: this.data.allques[$data3.id].attributes.xiangqing
  })
  console.log(this.data.netDetail2)
  wx.showModal({
    title: '详情',
    content: this.data.netDetail2 ,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
        /*wx.showModal({
          title: '详情',
          content:  '功能正在开发中，敬请期待',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })*/
      }
    }
  })
},
  detail3: function (e){
    var $data = e.currentTarget.dataset;
    console.log($data)
    this.setData({
      getid3: this.data.allques[$data.id].id
    })
    console.log(this.data.getid3)

    //绑定点击的objectid
    var that = this;
    console.log(666)
    wx.showActionSheet({
      itemList: ['已阅读', '已阅读并反馈', '已处理'],
      success: function (res) {
        console.log(res)
        console.log(that.data.itemList2[res.tapIndex])
        // 第一个参数是 className，第二个参数是 objectId
        var all= AV.Object.createWithoutData('allQues', that.data.getid3);
        console.log(that.data.itemList2[res.tapIndex])
        // 修改属性
        all.set('zhuangtai', that.data.itemList2[res.tapIndex]);        
        // 保存到云端
        all.save();        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  } ,
  detail4: function (e) {
    var $data = e.currentTarget.dataset;
    console.log($data)
    this.setData({
      getid2: this.data.Fankui[$data.id].id
    })
    console.log(this.data.getid2)

    //绑定点击的objectid
    var that = this;
    console.log(666)
    wx.showActionSheet({
      itemList: ['已阅读未处理', '已阅读并联系', '已处理问题'],
      success: function (res) {
        console.log(res)
        console.log(that.data.itemList3[res.tapIndex])
        // 第一个参数是 className，第二个参数是 objectId
        var net= AV.Object.createWithoutData('net', that.data.getid2);
        console.log(that.data.itemList3[res.tapIndex])
        // 修改属性
        net.set('zhuangtai', that.data.itemList3[res.tapIndex]);
        // 保存到云端
        net.save();
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },

life:function(e){
  var $data = e.currentTarget.dataset;
  //console.log($data.id)
  this.data.lifreplay[$data.id] = e.detail.value;
  //console.log($data.id)
  //console.log(this.data.lifreplay[$data.id])
  
  
 
},
  scanReplay:function(e){
    var $data = e.currentTarget.dataset;
    this.setData({
      getid3: this.data.allques[$data.id].id
    })
    //绑定点击的objectid
    var that = this;
    console.log(666)
    if (this.data.lifreplay[$data.id]==null){
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

    }else{
      // 第一个参数是 className，第二个参数是 objectId
      var all = AV.Object.createWithoutData('allQues', that.data.getid3);
      //console.log(that.data.itemList2[res.tapIndex])
      // 修改属性
      all.set('huifu', this.data.lifreplay[$data.id]);
      // 保存到云端
      all.save();
      wx.showModal({
        title: '提示',
        content: '已提交',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    
  },



  life2: function (e) {
    var $data = e.currentTarget.dataset;
    console.log($data.id)
    this.data.lifreplay2[$data.id] = e.detail.value;
    console.log($data.id)
    console.log(this.data.lifreplay2[$data.id])



  },
  scanReplay2: function (e) {
    var $data = e.currentTarget.dataset;
    console.log(this.data.Fankui[$data.id].id)
    this.setData({
      getid4: this.data.Fankui[$data.id].id
    })
    //绑定点击的objectid
    var that = this;
    console.log(666)
    if (this.data.lifreplay2[$data.id] == null) {
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
      var all = AV.Object.createWithoutData('net', that.data.getid4);
      //console.log(that.data.itemList2[res.tapIndex])
      // 修改属性
      all.set('huifu', this.data.lifreplay2[$data.id]);
      // 保存到云端
      all.save();
      wx.showModal({
        title: '提示',
        content: '已提交',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }


  },

});
const AV = require('../../libs/leancloud-storage.js');
const app = getApp()
import Dialog from '../../dist/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NetFix: [],
    bindhidden: true,
    look: "收起",
    itemList1: ['已安排维修', '正在维修中', '已完成维修'],
    getid: null,
    time: null,
    getreason:null,
    Fixdetail:false,
    gettitle:null,
    list:null,
    length:null,
    biaoqian: ['网络贴士', '你问我答', '资源共享'],
    biaoqianif: [true, false, false],
    Fankui:'',
    
    //以下为资源列表的初始化参数
    re_list:[],
    reOnOff:true
  },
//切换不同的栏目
  onClick(e){
    var that = this
    console.log(e)
    if (e.detail.index == 1) {
      that.setData({
        biaoqianif: [false, true, false]
      })
    }else if (e.detail.index == 0) {
      that.setData({
        biaoqianif: [true, false, false]
      })
    }else{
      that.setData({
        biaoqianif: [false, false, true]
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onload_re();
    this.re_off();
    var _this = this;
    //刷新网络
    /*
    var query2 = new AV.Query('net');
    //query2.startsWith('data')
    query2.find().then(function (net) {
      net.reverse()

      //数据处理
      _this.setData({
        Fankui: net,
        colornum2: net.length
      })
      //console.log(21)

      var length = net.length
      // console.log(_this.data.colornum)
      var fm2 = new Array(length);
      for (var i = 0; i < length; i++) {
        fm2[i] = _this.data.Fankui[i].attributes
        //console.log(1)
        //console.log(fm[i])
      }
      _this.setData({
        Fankui: fm2
      })

      //console.log(net)
      //that.setData({
      //  Fankui: net,
      // colornum2: net.length
      // })
    })*/


//网络修复

    //console.log(this.data.serchname)
    var query = new AV.Query('netfixmy');
    query.startsWith('for', '1');
    query.descending('createdAt');
    query.find().then(function (netfixmy) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      _this.setData({
        NetFix: netfixmy,
        length: netfixmy.length
      })
      //console.log(_this.data.NetFix)
      //var length = netfixmy.length
      var fm = new Array(_this.data.length);
      for (var i = 0; i < _this.data.length; i++) {
        fm[i] = _this.data.NetFix[i].attributes
        //console.log(1)
        //console.log(fm[i])
      }
      _this.setData({
        list: fm
      })
     // console.log(_this.data.NetFix)
    }, function (error) {
    });
},
  orderManage: function () {
    if (this.data.bindhidden == null) {
      this.setData({
        bindhidden: "true",
        look: "收起"
      })
    } else {
      this.setData({
        bindhidden: null,
        look: "查看"
      })
    }
  },


  detail: function (e) {
  

    var $data = e.currentTarget.dataset;
   // console.log($data)
    this.setData({
     gettitle: this.data.NetFix[$data.id].attributes.title,
     getreason: this.data.NetFix[$data.id].attributes.reason,
     getway: this.data.NetFix[$data.id].attributes.way
    })
    //console.log(this.data.gettitle)
    //console.log(this.data.getreason)
    //console.log(this.data.getway)
   
    wx.navigateTo({
      url: '../detail/detail?title=' + this.data.gettitle + '&reason=' + this.data.getreason + '&way=' + this.data.getway
    })

    //绑定点击的objectid
    //var _this = this;
   


    //console.log(666)
   
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

  //数据库表名：learn_resource
  /*link链接 title标题 image图片 upload_user_id上传者id upload_user_name上传者昵称 upload_user_image上传者头像 label标签 college学院/专业  class_name课程名 detail详情 down_num复制次数 */
  //初始化资源共享
  onload_re(){
    var _this = this;
    //刷新网络
    var query = new AV.Query('learn_resource');
    query.descending('createdAt');
    //query2.startsWith('data')
    query.find().then(function (net) {
      //net.reverse()
      //数据处理
      //var len=net.length
      _this.setData({
        re_list: net,
        //colornum2: net.length
      })
      //console.log(21)

      var length = net.length
      // console.log(_this.data.colornum)
      var fm_re = new Array(length);
      for (var i = 0; i < length; i++) {
        fm_re[i] = _this.data.re_list[i].attributes
        var date = new Date(net[i].createdAt.toString());
        var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        fm_re[i].creattime = date_value
        fm_re[i].objectId = net[i].id
        //console.log(1)
        //console.log(fm[i])
      }
      _this.setData({
        re_list: fm_re
      })
  },)},
  //点击查看详情
  link_detail(e){
    var that = this
    console.log(e)
    console.log(that.data.re_list[e.currentTarget.dataset.id])
    var mes = '资料详情：' + that.data.re_list[e.currentTarget.dataset.id].detail + ' ' + that.data.re_list[e.currentTarget.dataset.id].up_time + '\n' + '所属院系：' + that.data.re_list[e.currentTarget.dataset.id].college + '\n' + '课程：' + that.data.re_list[e.currentTarget.dataset.id].class_name + '\n' + "链接：" + that.data.re_list[e.currentTarget.dataset.id].link
    console.log(e.currentTarget.dataset.id)
    Dialog.confirm({
      title: '资源详情',
      message: mes,
      confirmButtonText: '复制链接',
      cancelButtonText: '取消',

    }).then(() => {
      // on confirm
      wx.setClipboardData({
        data: that.data.re_list[e.currentTarget.dataset.id].link,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功'
              })
              var num=that.data.re_list[e.currentTarget.dataset.id].down_num+1
              that.num_add(e.currentTarget.dataset.id, num)
              
            }
          })
        }
      })
    }).catch(() => {
      // on cancel
    });
  },
  //更新下载数量
  num_add(id,num){
    var that=this
    var obid = this.data.re_list[id].objectId
    var todo = AV.Object.createWithoutData('learn_resource', obid);
    todo.set('down_num', num);
    todo.save().then(function (a) {
that.onLoad()
    });
  },
  re_off(){
    var _this = this
    var query3 = new AV.Query('notice');
    query3.equalTo('have', true)
    query3.find().then(function (query) {
      console.log(query)
      if (query.length == 1) {
        _this.setData({
          reOnOff: query[0].attributes.have
        })
      }else{
        _this.setData({
          reOnOff:false
        })
      }
    })
  }
})
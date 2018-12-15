// pages/love_comment/love_comment.js
const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //以下为组件参数
    checked: true,
    show: false,
    comment_con: '',
    my_com: '',
    nei: 1,
    id: '',
    //以下为评论主题信息
    biaoqian: '',
    maincon: '',
    comment_object: '',
    imagebase64: '',
    title_ima_link: '',
    to_uid: '',
    creattime: '',
    zhaungtai: '',
    //以下为用户信息
    from_uid: '',
    user_name: '',
    user_image: '',
    //以下为评论区信息
    //加载数据库对象，数据库名称为：love_comment，各个字段含义：
    //anony：是否匿名
    //content:评论内容
    //comment_object：评论的主体对象
    //user_name:用户名，如果选择匿名，随机生成
    //user_image：用户头像，如果选择匿名，随机生成
    //from_uid：评论的用户标识，内容为openid
    //to_uid：被回复的人的id，如果没有回复，则为空
    //to_uname:被回复的人的昵称，如果没有回复，则为空，注意，此处为真是昵称
    //业务逻辑，初始化加载现有评论，点金评论后，获得评论对象id（object id），评论后插入节点
    //初始化见函数love_comment_onload()
    all_comment: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var _this = this
    if (app.globalData.user == null) {

      wx.showModal({
        title: '发生什么了？',
        content: '您的登陆状态失效，请重新登陆',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
          //返回主页
          else if (res.cancel) {
            console.log('用户点击取消')
          }
        }

      })
    }
    this.setData({
      biaoqian: options.biaoqian,
      maincon: options.maincon,
      comment_object: options.objectId,
      imagebase64: options.imagebase64,
      title_ima_link: options.title_ima_link,
      to_uid: options.openid,
      from_uid: options.from_uid,
      user_name: options.wxname,
      user_image: options.user_image,
      creattime: options.love_time,
      zhaungtai: options.zhaungtai,
    })

    this.comlist()


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onClickLeft(e) {


    wx.navigateBack({
      delta: 1
    });

  },
  mycom() {
    this.setData({
      show: true,
      nei: 1
    })
  },
  //关闭评论弹窗
  onClosecom() {
    this.setData({
      show: false,

    })
  },
  //提交评论
  pinglun() {
    console.log(123)
    if (this.data.checked == true) {
      //匿名

      if (this.data.nei == 1) {
        var uName = this.data.user_name
        var uImage = this.data.user_image
        var name = "作者"
        this.tijiao(name, uName, uImage)
      } else {
        var uName = this.data.user_name
        var uImage = this.data.user_image
        
        this.replay_con( uName, uImage)
      }
    } else {
      //实名
      console.log(123)

      if (this.data.nei == 1) {
        var uName = this.data.user_name
        var uImage = this.data.user_image
        var name = "作者"
        this.tijiao(name, uName, uImage)
      } else {
        //console.log(this.data.nei)
        var uName = this.data.user_name
        var uImage = this.data.user_image
        
        this.replay_con( uName, uImage)
      }

    }
  },
  onChangep(e) {
    this.setData({
      checked: false
    })
  },
  onInque(e) {
    console.log(e.detail)

    this.setData({
      my_com: e.detail
    })
  },
  tijiao(name, uName, uImage) {
    console.log(this.data.my_com)
    var that = this;
    //console.log(this.data.my_com, this.data.comment_object, this.data.user_image, this.data.from_uid, this.data.checked)
    var upcomm = AV.Object.extend('love_comment');
    var Act = new upcomm();
    Act.set('content', that.data.my_com);
    Act.set('comment_object', that.data.comment_object);
    Act.set('user_name', uName);
    Act.set('user_image', uImage);
    Act.set('from_uid', that.data.from_uid);
    Act.set('to_uid', that.data.to_uid);
    Act.set('to_uname', name);
    Act.set('anony', that.data.checked);
    Act.save().then(function(Act) {
      console.log(Act)
      that.comlist()
    })
  },
  //初始化加载评论区
  comlist() {
    var that = this
    var _this = this
    //初始化评论区，加载初始数据
    var query = new AV.Query('love_comment');
    query.descending('createdAt');
    
    query.equalTo('comment_object',this.data.comment_object)
    query.find().then(function(acts) {
      that.setData({
        all_comment: acts
      })
      console.log(acts)
      var len = acts.length
      var act_fm = new Array(len);
      for (var i = 0; i < len; i++) {
        act_fm[i] = acts[i].attributes
        //var time = acts[i].createdAt.toString()
        var date = new Date(acts[i].createdAt.toString());
        var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        act_fm[i].creattime = date_value
      }
      that.setData({
        all_comment: act_fm
      })

    })
  },
  replay_com(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      show: true,
      nei: 0,
      id: e.currentTarget.dataset.id
    })
    //var id = e.currentTarget.dataset.id

  },
  replay_con( uName, uImage) {
    var id = this.data.id
    var to_uid = this.data.all_comment[id].from_uid
    var to_uname = this.data.all_comment[id].user_name
   // this.replay_con(to_uid, to_uname)
    var that = this;
    //console.log(this.data.my_com, this.data.comment_object, this.data.user_image, this.data.from_uid, this.data.checked)
    var upcomm = AV.Object.extend('love_comment');
    var Act = new upcomm();
    Act.set('content', that.data.my_com);
    Act.set('comment_object', that.data.comment_object);
    Act.set('user_name', uName);
    Act.set('user_image', uImage);
    Act.set('from_uid', that.data.from_uid);
    Act.set('to_uid', to_uid);
    Act.set('to_uname', to_uname);
    Act.set('anony', that.data.checked);
    Act.save().then(function(Act) {
      console.log(Act)
      that.comlist()
    })
  },
  //重新加载评论区
re_load_comm(){

}
})
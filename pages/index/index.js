const app = getApp()
const AV = require('../../libs/leancloud-storage.js');
var util = require('../../time/time.js');
var util = require('../../utils/util.js');
var curPageIndex = [1, 1]
var tabInitState = [false, false]
import Dialog from '../../dist/dialog/dialog'
Page({
  data: {
    curSelClassifyIndex: 0,
    indeximg: [],
    imgUrls: [
      'http://lc-0B2nOcDK.cn-n1.lcfile.com/71ec86369190d4a79124.jpg',
      'http://lc-0b2nocdk.cn-n1.lcfile.com/03e34dce0ea98c001037.jpg'

    ],
    data: {
      active: 0
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxname: null,
    wxname2: null,
    wxname4: null,
    test: null,
    list: "综合反馈",
    listf: true,
    zhuangtai: "未登录（部分功能无法使用）",
    logos: [{
        image: "/image/qinshi.png",
        title: "电脑维修",
        bind: "yuTap"
      }, {
        image: "/image/xiaoyuan.png",
        title: "综合反馈",
        bind: "allUp"
      }, {
        image: "/image/choujiang.png",
        title: "网络报修",
        bind: "fixTap"
      },
      /*
          {
            image: "/image/nba.png",
            title: "NBA",
            bind: "nba"
          },{
            image: "/image/puzzle.png",
            title: "问题排查",
            bind: "fixMyTap"
          },*/

      {
        image: "/image/liuyan.png",
        title: "发布台",
        bind: "tomy"
      }, {
        image: "/image/biaobai.png",
        title: "表白墙",
        bind: "tolove"
      }

    ],
    allques: {},
    allques1: {},
    Fankui: {},
    look: "收起",
    bindhidden: true,
    bindhidden2: false,
    ifsupport: [],
    //suload: null,
    //snload: null,
    //net
    //sul: null,
    //snl: null,
    support: [],
    dissupport: [],

    supnum: null,
    ifdissupport: [],
    netzan: false,
    color: ['red', 'black'],
    color1: [],
    colornum: '',
    color2: [],
    coloenum2: '',
    hidden: false,
    biaoqian: ['发布台', '吐槽栏', '表白墙'],
    biaoqianif: [true, false, false],
    imageList: [],
    again: true,
    //activity
    act_news: {},
    act_news_up: {},
    love_wall: '',
    love_wall_update: '',
    loveshow: false,
    dq_ques: '',
    dq_ans: '',
    rell_ans: '',
    liuyan: '',
    love_obid: '',
    indexpage: [],
    tongzhi: false,
    tongzhi_detail: '',
    login_show: false,
  },
  //表白墙
  tolove(e) {
    wx.navigateTo({
      url: '../uplove/uplove'
    })
  },
  //查看回复
  watch_replay(e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    Dialog.confirm({
      title: '回复详情',
      message: that.data.allques[e.currentTarget.dataset.id].huifu,
      confirmButtonText: '满意',
      cancelButtonText: '不满意',

    });
  },
  previewImage_act(e) {
    console.log(e)
    const current = e.target.dataset.src

    this.data.imageList[0] = current
    this.setData({
      again: false
    })
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  previewImage(e) {
    console.log(e)
    const current = e.target.dataset.src

    this.data.imageList[0] = current
    this.setData({
      again: false
    })
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  //切换标签
  onClickbiaoqian(e) {
    var that = this
    console.log(e)
    if (e.detail.index == 1) {
      that.setData({
        biaoqianif: [false, true, false]
      })
    }
    if (e.detail.index == 0) {
      that.setData({
        biaoqianif: [true, false, false]
      })
    }
    if (e.detail.index == 2) {
      that.setData({
        biaoqianif: [false, false, true]
      })
    }
  },
  //跳转预约函数
  yuTap: function() {
    wx.navigateTo({
      url: '../yu/yu?wxname=' + this.data.userInfo.nickName
    })
    /// console.log("chick")
  },
  fixTap: function() {
    wx.navigateTo({
      url: '../net/net?wxname=' + this.data.userInfo.nickName
    })
  },
  nba: function() {
    wx.navigateTo({
      url: '../../api/apitest/apitest?wxname=' + this.data.userInfo.nickName
    })
  },

  onLoad: function() {
    var _this = this;
    var that = this;
    //console.log(app.globalData.user.authData.lc_weapp.openid)



    this.notice()
    //获取数据，判断是否要显示点赞功能（相当于吧功能调用放到云端了）
    var zan = new AV.Query('netif');
    zan.equalTo('name', 'netzan')
    // var zan=new AV.Query("netif");
    //query2.startsWith('data')
    zan.find().then(function(rec) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      rec.reverse()
      ///console.log(rec)
      _this.setData({
        netzan: rec[0].attributes.num
      })

    }, function(error) {});




    //综合反馈
    var image = new AV.Query('Indeximg');
    //query2.startsWith('data')

    image.find().then(function(rec) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      rec.reverse()
      //console.log(rec)

      for (var i = 0, len = rec.length; i < len; i++) {
        if (rec[i].attributes.view == true) {
          _this.data.indeximg.push(rec[i].attributes.url);
          _this.data.indexpage.push(rec[i].attributes.page);
        }
      }
      _this.setData({
        indeximg: _this.data.indeximg
      })
      //console.log(_this.data.indeximg)


    }, function(error) {});
    //High activity
    _this.up_act()
    //表白墙
    _this.up_love()
    /*
    var act_query = new AV.Query('activity');
    act_query.limit(20);
    act_query.descending('createdAt');
    act_query.find().then(function(acts){
      console.log(acts)
      _this.setData({
        act_news:acts,
      })
      var act_length=acts.length
      var act_fm=new Array(act_length)
      for (var i = 0; i < act_length; i++){
        act_fm[i]=acts[i].attributes
        act_fm[i].creattime = acts[i].createdAt
        console.log('act_fm{}'+act_fm[i])
      }
      console.log('act_fm:'+act_fm)
      _this.setData({
        act_news:act_fm,
      })
    })*/
    //表白墙
    this.up_love()
    //综合反馈
    var query3 = new AV.Query('allQues');
    query3.limit(10);
    query3.descending('createdAt');
    //query2.startsWith('data')
    query3.find().then(function(allQues) {
      //console.log(allQues)
      _this.setData({
        allques: allQues,
        colornum: allQues.length,
        hidden: true,
      })
      var length = allQues.length
      // console.log(_this.data.colornum)
      var fm = new Array(length);
      for (var i = 0; i < length; i++) {
        fm[i] = _this.data.allques[i].attributes
        //console.log(allQues[i].createdAt)
        fm[i].creattime = allQues[i].createdAt
        // fm[i]+=_this.data.allques[i].createdAt
        //console.log(1)
        //console.log(fm[i])
      }
      //console.log("next")

      _this.setData({
        allques: fm,
        allques1: fm
      })
      //console.log(_this.data.allques)
      var color = new Array([_this.data.colornum]);
      var i = 0;
      //console.log(66666666)
      for (i = 0; i < _this.data.colornum; i++) {
        //color.push('#eee')
        //console.log(color[i])
        // console.log(_this.data.colornum)
      }
      for (i = 0; i < _this.data.colornum; i++) {
        if (i % 5 == 0) {
          color[i] = '#F8BBD0'
        } else if (i % 5 == 1) {
          color[i] = '#D1C4E9'
        } else if (i % 5 == 2) {
          color[i] = '#BBDEFB'
        } else if (i % 5 == 3) {
          color[i] = '#B2EbF2'
        } else if (i % 5 == 4) {
          color[i] = '#DCEDC8'
        }

      }
      _this.setData({
        color1: color
      })
    }, function(error) {});



    var query2 = new AV.Query('net');
    //query2.startsWith('data')
    query2.find().then(function(net) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      net.reverse()
      //console.log(net)
      //数据处理
      _this.setData({
        Fankui: net,
        colornum2: net.length
      })
      var length = net.length
      // console.log(_this.data.colornum)
      var fm2 = new Array(length);
      for (var i = 0; i < length; i++) {
        fm2[i] = _this.data.Fankui[i].attributes
        //console.log(1)
        // console.log(fm2[i])
      }
      _this.setData({
        Fankui: fm2
      })
      console.log(_this.data.Fankui)
      //console.log(net)
      _this.setData({
        // Fankui: net,
        colornum2: net.length
      })

      var colors = new Array([_this.data.colornum2]);
      var i = 0;
      //console.log(66666666)
      for (i = 0; i < _this.data.colornum2; i++) {
        colors.push('#eee')
        //console.log(colors[i])
        // console.log(_this.data.colornum)
      }
      for (i = 0; i < _this.data.colornum2; i++) {
        if (i % 5 == 1) {
          colors[i] = '#DCEDC8'
        } else if (i % 5 == 2) {
          colors[i] = '#B2EbF2'
        } else if (i % 5 == 3) {
          colors[i] = '#BBDEFB'
        } else if (i % 5 == 4) {
          colors[i] = '#D1C4E9'
        } else if (i % 5 == 0) {
          colors[i] = '#F8BBD0'
        }

      }
      _this.setData({
        color2: colors
      })

      //_this.Fankui[0].
      // console.log(_this.data.Yuyue[0].attributes.date)
    }, function(error) {});




    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  

    this.setData({
      time: time
    });
    //console.log(8989)
    // console.log(app.globalData)


    var _this = this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        // test: app.globalData.user.nickName
      })


    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
        //console.log(this.data.userInfo)
        this.setData({
          wxname2: this.data.userInfo.nickName
        })
        wx.setStorageSync('wxid', this.data.wxname2)
      }



    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }

      })
    }
    this.setData({
      allques: this.data.allques
    })

  },

  onShow: function() {

    if (this.data.again == true) {
      // console.log(1)
      this.setData({
        hidden: false
      })
      //this.up_love()
      //this.up_act()
      //this.data.count = 123;
      // wx.stopPullDownRefresh();
      // wx.startPullDownRefresh()
      var that = this;
      var _this = this;
      //刷新act
      _this.up_act()
      _this.up_love()
      //刷新网络
      var query2 = new AV.Query('net');
      //query2.startsWith('data')
      query2.find().then(function(net) {
        net.reverse()

        //数据处理
        _this.setData({
          Fankui: net,
          colornum2: net.length
        })
        // console.log(21)

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
      })
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果

      //_this.up_all()

      //综合反馈
      var query3 = new AV.Query('allQues');
      query3.limit(10);
      query3.descending('createdAt');
      //query2.startsWith('data')
      query3.find().then(function(allQues) {
        // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
        //allQues.reverse()


        //allQues.reverse()
        _this.setData({
          allques: allQues,
          colornum: allQues.length,
          hidden: true,
        })
        var length = allQues.length
        // console.log(_this.data.colornum)
        var fm = new Array(length);
        for (var i = 0; i < length; i++) {
          fm[i] = _this.data.allques[i].attributes
          //console.log(1)
          //console.log(fm[i])
        }
        _this.setData({
          allques: fm
        })


      })
    } else {
      this.setData({
        again: true
      })
    }
  },
  getUserInfo: function(e) {

    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      // wxname2: this.data.userInfo.nickName
    })
    wx.setStorageSync('wxid2', this.data.userInfo.nickName)
    wx.setStorageSync('wxsrc2', this.data.userInfo.avatarUrl)

  },

  onShareAppMessage: function() {
    return {
      title: '指尖国关',
      desc: '手指尖的校园生活',
    }
  },
  fixMyTap: function() {
    wx.navigateTo({
      url: '../fixmy/fixmy'
    })
  },
  tomy: function() {
    wx.navigateTo({
      url: '../upnews/upnews'
    })
  },
  allUp: function() {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '网络问题请在网络反馈中告诉我们哦',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../allUp/allUp?wxname=' + _this.data.userInfo.nickName
          })
        } else if (res.cancel) {}
      }
    })
  },

  orderManage: function() {
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
  onTitleBarsClick0: function() {
    this.setData({
      curSelClassifyIndex: 0,
      bindhidden2: false,
      bindhidden: true
    })
  },
  // 分类点击监听（iOS）
  onTitleBarsClick1: function() {
    this.setData({
      curSelClassifyIndex: 1,
      bindhidden: false,
      bindhidden2: true
    })
  },

  switch1Change: function(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == false) {
      this.setData({
        list: "校园网络",
        bindhidden2: true,
        bindhidden: false
      })

    } else {
      this.setData({
        list: "综合反馈",
        bindhidden2: false,
        bindhidden: true
      })
    }
  },

  //点赞
  onUpTop: function(e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      suload: this.data.allques[$data].id
    })

    // console.log(this.data.suload)

    wx.getStorage({
      key: that.data.suload, //如果有该缓存，则证明已经点赞，设置判断为true
      success: function(res) {
        console.log("have")
        //console.log(res.data)

        that.data.ifsupport[$data] = false
        that.setData({
          ifsupport: that.data.ifsupport
        })
        that.concelup(that.data.suload, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      }, //如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function() {
        //console.log(123)
        wx.setStorage({
          key: that.data.suload,
          data: true
        })

        that.data.ifsupport[$data] = true
        that.setData({
          ifsupport: that.data.ifsupport
        })
        //console.log(that.data.ifsupport[$data])
        that.up(that.data.suload, $data)
        wx.showToast({
          title: "说得对！",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },

  //点赞函数
  up(id, viewid) {
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.supports = support.attributes.supports + 1
      that.data.allques[viewid].attributes.supports = support.attributes.supports
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('supports', that.data.allques[viewid].attributes.supports);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });


  },
  //取消点赞
  concelup(id, viewid) {
    wx.removeStorage({
      key: id,
      success: function(res) {
        //console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.supports = support.attributes.supports - 1
      that.data.allques[viewid].attributes.supports = support.attributes.supports
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('supports', that.data.allques[viewid].attributes.supports);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });

  },


  //踩一下
  onnptop: function(e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      snload: this.data.allques[$data].id
    })

    // console.log(this.data.snload)

    wx.getStorage({
      key: that.data.snload + 'dis', //如果有该缓存，则证明已经点赞，设置判断为true
      success: function(res) {
        console.log("dishave")
        //console.log(res.data)

        that.data.ifdissupport[$data] = false
        that.setData({
          ifdissupport: that.data.ifdissupport
        })
        that.concelnp(that.data.snload, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      }, //如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function() {
        // console.log(123)
        wx.setStorage({
          key: that.data.snload + 'dis',
          data: true
        })

        that.data.ifdissupport[$data] = true
        that.setData({
          ifdissupport: that.data.ifdissupport
        })
        // console.log(that.data.ifdissupport[$data])
        that.np(that.data.snload, $data)
        wx.showToast({
          title: "我觉得不行",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },
  np(id, viewid) {
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.dislike = support.attributes.dislike + 1
      that.data.allques[viewid].attributes.dislike = support.attributes.dislike
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('dislike', that.data.allques[viewid].attributes.dislike);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });


  },
  //取消点赞
  concelnp(id, viewid) {
    wx.removeStorage({
      key: id + 'dis',
      success: function(res) {
        //console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('allQues');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.dislike = support.attributes.dislike - 1
      that.data.allques[viewid].attributes.dislike = support.attributes.dislike
      that.setData({
        allques: that.data.allques
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('allQues', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('dislike', that.data.allques[viewid].attributes.dislike);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });

  },

  //网络点赞
  //点赞
  UpTop: function(e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      sul: this.data.Fankui[$data].id
    })

    //console.log(this.data.sul)

    wx.getStorage({
      key: that.data.sul + 'net', //如果有该缓存，则证明已经点赞，设置判断为true
      success: function(res) {
        // console.log("have")
        //console.log(res.data)

        that.data.support[$data] = false
        that.setData({
          support: that.data.support
        })
        that.concelup2(that.data.sul, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      }, //如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function() {
        //console.log(123)
        wx.setStorage({
          key: that.data.sul + 'net',
          data: true
        })

        that.data.support[$data] = true
        that.setData({
          support: that.data.support
        })
        //console.log(that.data.support[$data])
        that.up2(that.data.sul, $data)
        wx.showToast({
          title: "说得对！",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },

  //点赞函数
  up2(id, viewid) {
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.sup = support.attributes.sup + 1
      that.data.Fankui[viewid].attributes.sup = support.attributes.sup
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('sup', that.data.Fankui[viewid].attributes.sup);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });


  },
  //取消点赞
  concelup2(id, viewid) {
    wx.removeStorage({
      key: id + 'net',
      success: function(res) {
        //console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.sup = support.attributes.sup - 1
      that.data.Fankui[viewid].attributes.sup = support.attributes.sup
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('sup', that.data.Fankui[viewid].attributes.sup);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });

  },


  //踩一下
  nptop: function(e) {
    var that = this
    //console.log(e)
    var $data = e.currentTarget.dataset.id;

    //console.log($data)
    //获得当前id
    this.setData({
      snl: this.data.Fankui[$data].id
    })

    // console.log(this.data.snload)

    wx.getStorage({
      key: that.data.snl + 'disnet', //如果有该缓存，则证明已经点赞，设置判断为true
      success: function(res) {
        // console.log("dishave")
        //console.log(res.data)

        that.data.dissupport[$data] = false
        that.setData({
          dissupport: that.data.dissupport
        })
        that.concelnp2(that.data.snl, $data)
        wx.showToast({
          title: "其实是手滑了",
          duration: 1000,
          icon: "sucess",
          make: true
        })

      }, //如果没有该缓存，则判断没有点赞，新建缓存，并设置判断为false
      fail: function() {
        //console.log(123)
        wx.setStorage({
          key: that.data.snl + 'disnet',
          data: true
        })

        that.data.dissupport[$data] = true
        that.setData({
          dissupport: that.data.dissupport
        })
        // console.log(that.data.ifdissupport[$data])
        that.np2(that.data.snl, $data)
        wx.showToast({
          title: "我觉得不行",
          duration: 1000,
          icon: "sucess",
          make: true
        })
      }
    })

  },
  np2(id, viewid) {
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.diske = support.attributes.diske + 1
      that.data.Fankui[viewid].attributes.diske = support.attributes.diske
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('diske', that.data.Fankui[viewid].attributes.diske);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });


  },
  //取消点赞
  concelnp2(id, viewid) {
    wx.removeStorage({
      key: id + 'disnet',
      success: function(res) {
        //console.log(res.data)
      }
    })
    var that = this
    var query = new AV.Query('net');
    query.get(id).then(function(support) {
      // 成功获得实例
      // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
      support.attributes.diske = support.attributes.diske - 1
      that.data.Fankui[viewid].attributes.diske = support.attributes.diske
      that.setData({
        Fankui: that.data.Fankui
      })

      // 第一个参数是 className，第二个参数是 objectId
      var suc = AV.Object.createWithoutData('net', id);
      // 修改属性
      //console.log(that.data.allques[viewid].attributes.supports)
      suc.set('diske', that.data.Fankui[viewid].attributes.diske);
      // 保存到云端
      suc.save();

    }, function(error) {
      // 异常处理
    });

  },

  //下拉刷新
  onPullDownRefresh: function(e) {

    // console.log(1)
    this.up_act()
    this.up_love()
    this.setData({
      hidden: false
    })
    //this.data.count = 123;
    // wx.stopPullDownRefresh();
    // wx.startPullDownRefresh()
    var that = this;
    var _this = this;
    //刷新网络
    var query2 = new AV.Query('net');
    //query2.startsWith('data')
    query2.find().then(function(net) {


      //net.reverse()


      //数据处理
      _this.setData({
        Fankui: net,
        colornum2: net.length
      })
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
    })
    // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果


    //综合反馈
    var query3 = new AV.Query('allQues');
    query3.limit(10);
    query3.descending('createdAt');
    //query2.startsWith('data')
    query3.find().then(function(allQues) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //allQues.reverse()

      /**
       * 以下为处理数据，防止异常显示
       */
      //allQues.reverse()
      _this.setData({
        allques: allQues,
        colornum: allQues.length,
        hidden: true,
      })
      var length = allQues.length
      // console.log(_this.data.colornum)
      var fm = new Array(length);
      for (var i = 0; i < length; i++) {
        fm[i] = _this.data.allques[i].attributes
        //console.log(1)
        //console.log(fm[i])
      }
      _this.setData({
        allques1: fm
      })

    })
    // console.log(_this.data.colornum)

  },
  //表白墙加载及更新
  up_love() {
    var _this = this
    var love = new AV.Query('love')
    love.descending('createdAt');
    love.find().then(function(rec) {
      console.log(rec)
      var love_length = rec.length
      var fl = new Array(love_length)
      for (var i = 0, len = rec.length; i < len; i++) {
        fl[i] = rec[i].attributes
        var date = new Date(rec[i].createdAt.toString());
        var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        fl[i].creattime = date_value
        fl[i].objectId = rec[i].id
        // console.log('act_fm{}' + act_fm[i])
      }
      _this.setData({
        love_wall: fl
      })
      console.log(_this.data.love_wall)
    })
  },
  //活动加载及更新
  up_act() {
    var _this = this
    //High activity
    var act_query = new AV.Query('activity');
    act_query.limit(20);
    act_query.descending('createdAt');
    act_query.find().then(function(acts) {
      // console.log(acts)
      _this.setData({
        act_news: acts,
      })
      var act_length = acts.length
      var act_fm = new Array(act_length)
      for (var i = 0; i < act_length; i++) {
        act_fm[i] = acts[i].attributes
        //var time = acts[i].createdAt.toString()
        var date = new Date(acts[i].createdAt.toString());
        var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        act_fm[i].creattime = date_value

        // console.log('act_fm{}' + act_fm[i])
      }
      // console.log('act_fm:' + act_fm)
      _this.setData({
        act_news: act_fm,
      })
    })
  },
  //综合反馈刷新
  up_all() {
    //综合反馈
    var query3 = new AV.Query('allQues');
    query3.limit(10);
    query3.descending('createdAt');
    //query2.startsWith('data')
    query3.find().then(function(allQues) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //allQues.reverse()

      /**
       * 以下为处理数据，防止异常显示
       */
      //allQues.reverse()
      _this.setData({
        allques: allQues,
        colornum: allQues.length,
        hidden: true,
      })
      var length = allQues.length
      // console.log(_this.data.colornum)
      var fm = new Array(length);
      for (var i = 0; i < length; i++) {
        fm[i] = _this.data.allques[i].attributes
        //console.log(1)
        //console.log(fm[i])
      }
      _this.setData({
        allques: fm
      })


    })
  },
  jstojson(Data) {

  },
  watch_act_detail(e) {
    var that = this
    console.log(that.data.act_news[e.currentTarget.dataset.id])
    var mes = '活动开始时间：' + that.data.act_news[e.currentTarget.dataset.id].up_date + ' ' + that.data.act_news[e.currentTarget.dataset.id].up_time + '\n' + '活动结束时间：' + that.data.act_news[e.currentTarget.dataset.id].end_date + ' ' + that.data.act_news[e.currentTarget.dataset.id].end_time + '\n' + '活动报名方式：' + that.data.act_news[e.currentTarget.dataset.id].tel + '\n' + "活动详情：" + that.data.act_news[e.currentTarget.dataset.id].main
    console.log(e.currentTarget.dataset.id)
    Dialog.confirm({
      title: '活动详情',
      message: mes,
      confirmButtonText: '复制',
      cancelButtonText: '取消',

    }).then(() => {
      // on confirm
      wx.setClipboardData({
        data: mes,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        }
      })
    }).catch(() => {
      // on cancel
    });
  },
  onChange(e) {
    console.log(e.detail);
    if (e.detail == 0) {

      console.log(1)
      wx.redirectTo({
        url: '../index/index'
      })

    } else if (e.detail == 1) {
      wx.redirectTo({
        url: '../my/my',
      })

    } else if (e.detail == 2) {
      console.log('隐藏')
    }
  },
  showCustomDialog(e) {
    var _this = this
    this.setData({
      loveshow: true,
      dq_ques: _this.data.love_wall[e.currentTarget.dataset.id].ques,
      liuyan: _this.data.love_wall[e.currentTarget.dataset.id].liuyan,
      rell_ans: _this.data.love_wall[e.currentTarget.dataset.id].ans,
      love_obid: _this.data.love_wall[e.currentTarget.dataset.id].objectId
    });
    console.log(e.currentTarget.dataset.id)
  },
  onCloselove(event) {
    if (event.detail === 'confirm') {
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          loveshow: false,
          dq_ques: '',
          dq_ans: '',
          liuyan: ''
        });
      }, 1000);
    } else {
      this.setData({
        loveshow: false,
        dq_ques: '',
        dq_ans: '',
        liuyan: ''
      });
    }
  },
  peiduilove(event) {
    var that = this
    console.log(event)
    if (this.data.rell_ans == this.data.dq_ans) {
      //console.log(this.data.liuyan)
      Dialog.alert({
        title: '恭喜你配对成功！',
        message: that.data.liuyan
      }).then(() => {
        // on close
      });
      var obid = that.data.love_obid
      var love_zt = AV.Object.createWithoutData('love', obid);
      //console.log(that.data.itemList2[res.tapIndex])
      // 修改属性
      love_zt.set('zhaungtai', '已配对');
      // 保存到云端
      love_zt.save();
    } else {
      Dialog.alert({
        title: '很抱歉',
        message: '这并不是正确答案'
      }).then(() => {
        // on close
      });
    }
  },
  onInques(e) {
    console.log(e.detail)

    this.setData({
      dq_ans: e.detail
    })
  },
  binditem(e) {
    console.log(e)
    var _this = this
    var page = this.data.indexpage[e.currentTarget.dataset.id]
    console.log(page)
    var url = '../' + page + '/' + page + '?wxname=' + _this.data.userInfo.nickName
    console.log(url)
    wx.navigateTo({
      url: url
    })
  },
  //通知
  notice(e) {
    var _this = this
    //综合反馈
    var query3 = new AV.Query('notice');
    //query3.limit(10);
    //query3.descending('createdAt');
    query3.equalTo('have', true)
    //query2.startsWith('data')
    query3.find().then(function(query) {
      // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      //allQues.reverse()
      console.log(query)
      /**
       * 以下为处理数据，防止异常显示
       */
      //allQues.reverse()
      if (query.length == 1) {
        _this.setData({
          tongzhi_detail: query[0].attributes.notice,
          tongzhi: query[0].attributes.have,
          // hidden: true,
        })
      }
      //var length = allQues.length
      // console.log(_this.data.colornum)
      //var fm = new Array(length);
      //   for (var i = 0; i < length; i++) {
      //   fm[i] = _this.data.allques[i].attributes
      //console.log(1)
      //console.log(fm[i])
      // }



    })
  },
  //以下为表白墙评论函数
  love_comment() {
    //加载数据库对象，数据库名称为：love_comment，各个字段含义：
    //anony：是否匿名
    //content:评论内容
    //comment_object：评论的主体表白
    //user_name:用户名，如果选择匿名，随机生成
    //user_image：用户头像，如果选择匿名，随机生成
    //from_uid：评论的用户标识，内容为openid
    //to_uid：被回复的人的id，如果没有回复，则为空
    //to_uname:被回复的人的昵称，如果没有回复，则为空，注意，此处为真是昵称
    //业务逻辑，初始化加载现有评论，点金评论后，获得评论对象id（object id），评论后插入节点
    //初始化见函数love_comment_onload()
  },
  //表白墙评论初始化
  love_comment_onload() {
    var that = this
    var queryLove = new AV.Query('love_comment'); //新建查询对象

  },
  bind_to_love_comment(e) {
    //console.log()
    var id = e.currentTarget.dataset.id;
    console.log(this.data.love_wall[id].liuyan)
    wx.navigateTo({
      url: '../love_comment/love_comment?wxname=' + app.globalData.user.nickName + '&from_uid=' + app.globalData.user.authData.lc_weapp.openid + '&biaoqian=' + this.data.love_wall[id].biaoqian +
        '&maincon=' + this.data.love_wall[id].maincon + '&openid=' + this.data.love_wall[id].openid + '&objectId=' + this.data.love_wall[id].objectId + '&imagebase64=' + this.data.love_wall[id].imagebase64 + '&title_ima_link=' + this.data.love_wall[id].title_ima_link + '&user_image=' + app.globalData.user.avatarUrl + '&love_time=' + this.data.love_wall[id].creattime + '&zhaungtai=' + this.data.love_wall[id].zhaungtai
    })
  }
})
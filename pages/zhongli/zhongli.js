var transformLeft = 0, obj;
Page({
  data: {
    src: 'http://lc-0b2nocdk.cn-n1.lcfile.com/e28deb1119ee175b4f37.jpg',
    transformLeft: 50
  },
  changeName: function (e) {
    // sent data change to view
    console.log(this);
    this.setData({
      name: 'MINA'
    })
  },
  onLoad: function (e) {
    obj = this;
    console.log(this.data.mgLeft);
    wx.onAccelerometerChange(function (res) {
      if (res.x > 0) {
        transformLeft += 3;
      }
      else if (res.x < 0) {
        transformLeft -= 3;
      }
      obj.setData({
        transformLeft: transformLeft
      })

    })

  }
})
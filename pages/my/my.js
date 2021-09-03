// pages/my/my.js
var app = getApp();
Page({
  data: {
     userInfo:[]
  },
  SwitchToLoginPage:function(){
     wx.navigateTo({
       url: '../login/login',
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
    })
  },
  onHide: function () {
  },
  onUnload: function () {
  },
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
  loginout:function(){
    wx.clearStorage({
      
      success: (res) => {
        wx.showLoading({
          title: '正在退出',
          mask: false
        })
        const userInfo = wx.getStorageSync('userInfo')
        this.setData({
          userInfo
        })
        wx.hideLoading()
      },
    }) 
  }
})
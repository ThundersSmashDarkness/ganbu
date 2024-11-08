// pages/GAM/GAM.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    foodvalue:50,
    drinkvalue:50,
    medicalvalue:30,
    dailyvalue:20,
    foodleft:21000,
    drinkleft:18510,
    medicalleft:8888,
    dailyleft:12310,

   
  },
  onChange(event) {
    wx.showToast({
      title: `切换到 ${event.detail.title}`,
      icon: 'none',
    });
  },

  gotoaddGAM:function(){

  wx.navigateTo({
    url: '../GAM/GAMadd/GAMadd',
  })

  },

  gotoGAMhistory:function(){

    wx.navigateTo({
      url: '../GAM/GAMhistory/GAMhistory',
    })
  
    },


  onFoodChange(event) {
    this.setData({
      foodvalue:event.detail
    })  
  },
  onDrinkChange(event) {
    this.setData({
      drinkvalue:event.detail
    })  
  },
  onMedicalChange(event) {
    this.setData({
      medicalvalue:event.detail
    })  
  },
  onDailyChange(event) {
    this.setData({
      dailyvalue:event.detail
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        foodvalue:70
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
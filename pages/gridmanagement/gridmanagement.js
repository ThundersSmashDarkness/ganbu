// pages/gridmanagement/gridmanagement.js
import {request} from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
grid_info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: '/grid/allInfo',
      data: {},
      header: {'content-type':
      'application/json' },
      method: 'POST',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    }).then(result=>{
    console.log(result.data)
        this.setData({
     grid_info:result.data.info
        })
        console.log(result.data.info)
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
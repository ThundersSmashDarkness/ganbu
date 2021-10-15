// pages/FZSBCL/FZSBCL.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   allReadySendHouse:80,
   specialHouse:58,
   allReadyConfirm:68,
   dangerousHouse:77,
   show:{
     name:"李四",
   drink: "2",
food: "3",
location: "浙江省杭州市临平区外翁线 临平区十五堡(外翁线南)",
medicine: "1",
name: "李四",
num: "3",
phone: "13812345678",
yongpin: "2"
  },

   number:[
{id:"0",house_id:"张三",
drink: "3",
food: "3",
location: "火灾避难区",
medicine: "3",
name: "张三",
num: "3",
phone: "15812345678",
yongpin: "3"
},
{id:"1",house_id:"杨四",},
{id:"2",house_id:"赵五",},
{id:"3",house_id:"刘六",},
{id:"4",house_id:"陈七",},
{id:"5",house_id:"周八",},
{id:"6",house_id:"姜九",}
   ]
  },

  ToGAM:function(){

 wx.navigateTo({
   url: '../GAM/GAM',
 })

  },


  ToConirmedHouseDetail:function(){

  wx.navigateTo({
    url: 'ConirmedHouseDetail/ConirmedHouseDetail',
  })

  },


  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
        Dialog.confirm({
          message: '再次确认',
        }).then(() => {
          instance.close();

          var WZSQS = wx.getStorageSync('wuzishenqingshu');
          WZSQS=WZSQS-1;
          wx.setStorageSync('wuzishenqingshu', WZSQS);

        });
        break;
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定拒绝吗？',
        }).then(() => {
          instance.close();
          var WZSQS = wx.getStorageSync('wuzishenqingshu');
          WZSQS=WZSQS-1;
          wx.setStorageSync('wuzishenqingshu', WZSQS);
        });
        break;
    }
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





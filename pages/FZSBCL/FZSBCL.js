// pages/FZSBCL/FZSBCL.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
   number:[
{id:"0",house_id:"a1",exceptional_case:true,isDangerHouse:true,isconfirmed:true},
{id:"1",house_id:"b1",exceptional_case:false,isDangerHouse:false,isconfirmed:true},
{id:"2",house_id:"c1",exceptional_case:false,isDangerHouse:true,isconfirmed:false},
{id:"3",house_id:"a2",exceptional_case:true,isDangerHouse:false,isconfirmed:false},
{id:"4",house_id:"a8",exceptional_case:true,isDangerHouse:false,isconfirmed:true},
{id:"5",house_id:"d1",exceptional_case:true,isDangerHouse:true,isconfirmed:true},
{id:"6",house_id:"d4",exceptional_case:false,isDangerHouse:false,isconfirmed:true}
   ]
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
        Dialog.confirm({
          message: '再次确认',
        }).then(() => {

          instance.close();
        });
        break;
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定打回吗？',
        }).then(() => {
          instance.close();
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





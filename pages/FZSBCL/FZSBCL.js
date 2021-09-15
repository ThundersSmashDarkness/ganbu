// pages/FZSBCL/FZSBCL.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
   number:[
{id:"0"},
{id:"1"},
{id:"2"},
{id:"3"},
{id:"4"},
{id:"5"},
{id:"5"}
   ]
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
        Dialog.confirm({
          message: '进入详情页面？',
        }).then(() => {
          instance.close();
        });
        break;
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
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
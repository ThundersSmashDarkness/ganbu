// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:'',
    bgc: '',
    order:{}
  },

  judge(order){
    for(let i in order){
      return true
    }
    return false
  },
  handleNumEdit(e){
    const {operation} = e.currentTarget.dataset;
    let {order,goods,bgc} = this.data;
    goods.num += operation;
    order.totalNum += operation;
    order.totalPrice += goods.goods_price * operation;
    // 更新订单
    order.goods.forEach(v=>{
      if(v.id == goods.id){
        v.num = goods.num
      }
    })
    if(order.totalNum == 0){
      bgc = 'gray'
    }else{
      bgc = 'var(--themeColor2)'
    }
    this.setData({
      goods,
      order,bgc
    })
    wx.setStorageSync('order', order)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const order = wx.getStorageSync('order') || {};
    const rightContent = wx.getStorageSync('rightContent');
    let goods = '';
    const flag = this.judge(order)
    if(!flag){
      rightContent.forEach(v=>{
        if(v.id == options.page){
          goods = v;
        }
      })
      console.log(11111);
    }else{
      order.goods.forEach(v=>{
        if(v.id == options.page){
          goods = v;
        }
      })
      console.log(222222);
    }
    let bgc = "gray";
    if(order.totalNum > 0 ){
      bgc = "var(--themeColor2)"
    }
    this.setData({
      goods,
      order,bgc
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
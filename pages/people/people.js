// pages/people/people.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
   scrollTop:0,
   houseContent:[
{address:"浙江省XX市XX县XX乡XX村XX街道",name:"村庄1",village_id:"1",house_id:"a1",contact:"88753977",photo_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp0.meituan.net%2Fdpmerchantpic%2F3c916d38b260ce8fc8ba7ce89fb391ca883672.jpg&refer=http%3A%2F%2Fp0.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633950694&t=d88f46ca846903c70c4d4eb58e2dda7e"},
{address:"浙江省XX市XX县XX乡XX村XX街道",name:"村庄1",village_id:"2",house_id:"b1",contact:"89756621",photo_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cac7596b68eba8012193a3f44505.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633950694&t=e4b9cf4d3bfd0698b739045079253927"},
{address:"浙江省XX市XX县XX乡XX村XX街道",name:"村庄1",village_id:"1",house_id:"b2",contact:"88888888",photo_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2F2020%2F0114%2Fbceacfc2j00q433ib0068c0018f00tmm.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633952569&t=70984da09386fb4bfabd06eb57bcb857"},
{address:"浙江省XX市XX县XX乡XX村XX街道",name:"村庄1",village_id:"1",house_id:"c1",contact:"88777777",photo_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp0.meituan.net%2Fdpdeal%2F50421aa552374f5e84e93e8d289ec272615887.jpg&refer=http%3A%2F%2Fp0.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633952569&t=b9840199d8afcb9ad6b217f0595049f3"},{address:"浙江省XX市XX县XX乡XX村XX街道",name:"村庄1",village_id:"1",house_id:"c2",contact:"88777788",photo_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01036659f400a1a801202b0c7f3238.JPG%403000w_1l_0o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633952569&t=c1b76f79add6e458c65c6d9d7e572194"}
   ]
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

  },
  addHouse:function(){
    wx.navigateTo({
      url: '../addhouse/addhouse',
    })
  },onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
})
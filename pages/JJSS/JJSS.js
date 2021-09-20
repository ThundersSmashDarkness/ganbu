// pages/JJSS/JJSS.js

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
     linkstart:false,
     type: [
      {name: '火灾撤离' , bgc: '#fff' , color: '#000', ischecked:''},
      {name: '洪灾撤离' , bgc: '#fff' , color: '#000',ischecked:''},
      {name: '地质灾害' , bgc: '#fff' , color: '#000',ischecked:''},
      {name: '应急事件' , bgc: '#fff' , color: '#000',ischecked:''},
      {name: '其他' , bgc: '#fff' , color: '#000',ischecked:''}
    ],
   
  },
  handletouch1(e){
    const {type} = this.data;
    const {index1} = e.currentTarget.dataset;
    for(let i = 0 ; i < type.length ; i++){
      type[i].bgc = "#ffffff"; 
      type[i].color = "#000000";
      type[i].ischecked = ''
    }
    for(let i = 0 ; i < type.length ; i++){
      if(index1 == i){
        type[i].bgc = "#0ac496"; 
        type[i].color = "#fff";
        type[i].ischecked = true;
      }
    }
    this.setData({
      type
    })
  },

  LINKSTART:function(){

    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '倒计时 3 秒',
      selector: '#custom-selector',
    });
    
    let second = 3;
    const timer = setInterval(() => {
      second--;
      if (second) {
        toast.setData({
          message: `倒计时 ${second} 秒`,
        });
      } else {
        clearInterval(timer);
        Toast.clear();
      }
    }, 1000);

    var that=this
    var LS=this.data.linkstart
  if(LS){
    that.setData({
      linkstart:false
    })
  }else{

    that.setData({
      linkstart:true
    })
  }
  }
 ,

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


  clickCategory:function(e){ // 这里我们传入一个当前值
    console.log(e.currentTarget.dataset);
    // 　　this.categoryIndex = index
    },
})
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */

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
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用
    // canIUse: wx.canIUse("button.open-type=getUserInfo")
  },
 
  // 用户授权
  login(){

    wx.getUserProfile({
      desc: 'desc',
      success:file=>{
        console.log("bindGetUserInfo获取用户信息成功！")
        console.log(file) 
        const userInfo = file.userInfo;
        wx.setStorageSync("userInfo",userInfo);

        wx.login({
          success: log => {
            console.log("wx.login.code", log)
            
            // 加载进度
            wx.showLoading({
              title: '正在请求数据',
              mask: false
            })
            
            // 发送 res.code 到后台换取 openId, sessionKey,返回openid保存
            wx.request({
              url: 'http://47.97.152.69:8080/user/login',
              data: {
                code: log.code,
                userInfoData:file.encryptedData,
                userInfoIv:file.iv,
                type:'1'
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST',
              success(res) {
                console.log("登录成功", res)
                // 获取到openid后将openid存入本地,同时放到全局变量里
   

                const session_id = res.data.session_id;
               wx.setStorageSync('session_id', session_id);

                wx.hideLoading()
                // 然后跳转主页面
                wx.switchTab({
                  url: '/pages/my/my',
                })
               
              },
              fail(res){
                console.log("请求失败")
                wx.hideLoading()
                wx.showToast({
                  title: '请求失败',
                  icon: 'none', // "success", "loading", "none"
                  duration: 1500,
                  mask: false
                })
              }
            })
            // request请求结束
          }
        })







      }
    })
      
    
 
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
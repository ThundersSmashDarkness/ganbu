// function login(){
//   console.log("登陆请求获取openid")
 
// wx.getUserProfile({
//   desc: '登录授权',
//   success:(res)=>{
//     console.log(res);
//    this.setData({


//    })

//   }
// })


//   // 登录
//   wx.login({
//     success: res => {
//       console.log("wx.login.code", res)
      
//       // 加载进度
//       wx.showLoading({
//         title: '正在请求数据',
//         mask: false
//       })
      
//       // 发送 res.code 到后台换取 openId, sessionKey,返回openid保存
//       wx.request({
//         url: 'http://47.97.152.69:8080/user/login',
//         data: {
//           code: res.code,
//           // 将用户信息传到服务器保存
//           userInfo: getApp().globalData.userInfo
//         },
//         header: {
//           'content-type': 'application/json' // 默认值
//         },
//         method: 'POST',
//         success(res) {
//           console.log("成功", res)
//           // 获取到openid后将openid存入本地,同时放到全局变量里
//           getApp().globalData.openid = res.data.openid
 
//           wx.setStorage({
//             key: 'openid',
//             data: res.data.openid
//           })
 
//           wx.hideLoading()
//           // 然后跳转主页面
      
         
//         },
//         fail(res){
//           console.log("请求失败")
//           wx.hideLoading()
//           wx.showToast({
//             title: '请求失败',
//             icon: 'none', // "success", "loading", "none"
//             duration: 1500,
//             mask: false
//           })
//         }
//       })
//       // request请求结束
//     }
//   })
// };
 
// module.exports = {
//   login: login
// }
// 同时发送异步代码的次数
let time = 0;
export const request=(params)=>{
  time++
  // 显示加载中效果
  wx.showLoading({
    title: '加载中',
    // mask为true表示用户在看到该图标后无法对页面进行操作
    mask:true
  })
  // 定义公共的url
  const baseUrl = "http://47.97.152.69:8080";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      // 优化接口路径
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        time--
        if(time===0){
          // 关闭正在等待的图标
          wx.hideLoading()
        }
      }
    });
  })
}
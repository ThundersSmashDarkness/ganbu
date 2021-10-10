const recorderManager = wx.getRecorderManager();
const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {

    // 图片
    imgs: [],
  count: 3,

  //日期

  date: '',
  show: false,

    pickerHidden: true,
    chosen: '',
    showImage_url: '',
    agency:'',
    content:'',
    title:'',
    type:'',
    notice_content:''
  },

  voice_on:function(){

    this.setData({
    notice_content:"hahahahahahaha"
    })

  },

  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      agency: e.detail.value.agency,
      title: e.detail.value.title,
      type: e.detail.value.type,
      content: e.detail.value.content
    })
    var that =this;
    wx.request({
      url: 'http://47.97.152.69:8080/notice/add',//后台接口路径
      data: {
        'agency': that.data.agency,
        'title': that.data.title,
        'type': that.data.type,
        'content': that.data.content
      },
      method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        'content-type':'application/json' 
      }, // 设置请求的 header 
      success: function (res) {
       
        console.log("提交任务成功:"+res);
        var tt=JSON.stringify(res);
        console.log(tt);
        wx.showModal({//提示弹框
          title: '提示',
          content: '提交成功，请耐心等待审核。',
          showCancel: false, //是否显示取消按钮 
        
        })
      },
      fail: function () {
        console.log("请求数据失败");
      }
    })
     

  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },


  bindUpload: function (e) {
    switch (this.data.imgs.length) {
      case 0:
        this.data.count = 3
        break
      case 1:
        this.data.count = 2
        break
      case 2:
        this.data.count = 1
        break
    }
    var that = this
    wx.chooseImage({
      count: that.data.count, // 默认3
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://graph.baidu.com/upload',
            filePath: tempFilePaths[i],
            name: "file",
            header: {
              "content-type": "multipart/form-data"
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: "上传成功",
                  icon: "none",
                  duration: 1500
                })
   
                that.data.imgs.push(JSON.parse(res.data).data)
   
                that.setData({
                  imgs: that.data.imgs
                })
              }
            },
            fail: function (err) {
              wx.showToast({
                title: "上传失败",
                icon: "none",
                duration: 2000
              })
            },
            complete: function (result) {
              console.log(result.errMsg)
            }
          })
        }
      }
    })
  },
  deleteImg: function (e) {
    var that = this
    wx.showModal({
      title: "提示",
      content: "是否删除",
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.imgs.length; i++) {
            if (i == e.currentTarget.dataset.index) that.data.imgs.splice(i, 1)
          }
          that.setData({
            imgs: that.data.imgs
          })
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  },

startRecordMp3: function () {
    recorderManager.start({
        format: 'mp3'
    });
}

/**
 * 停止录音
 */
,
stopRecord: function () {
    recorderManager.stop()
    
}

/**
 * 播放录音
 */
, playRecord: function () {
    var that = this;
    var src = this.data.src;
    if (src == '') {
        this.tip("请先录音！")
        return;
    }
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
},
sendRecord:  function() {
  let that = this;
  return new Promise(function (resolve, reject){
  wx.uploadFile({
    url: 'http://47.97.152.69:8080/voice/aip',
    filePath: that.data.src,
    formData: {
      method: 'POST'
    },
    name: 'file',
    success:(res)=>{
      // console.log(res);

      // console.log('test: '+res.data);
      // var resData = res.data.replace(" ", "");
      // //去掉utf8编码的BOM头
      // resData = resData.replace(/\ufeff/g, "");
      // console.log('test2: '+resData);
      // var X = JSON.parse(resData);
      resolve(res.data.result);
      console.log(res.data.result);
        that.data.notice_content;
        resolve();
    }
});
});
},

translate:function(){
 let that=this;
    wx.uploadFile({url: 'http://47.97.152.69:8080/voice/aip',
    filePath: that.data.src,
    formData: {
      method: 'POST'
    },
    name: 'file',}).then(res => console.log(res))

},

tip: function (msg) {
  wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
  })
},
onLoad: function (options) {


  



  var that = this;
  recorderManager.onError(function () {
      that.tip("录音失败！")
  });
  recorderManager.onStop(function (res) {
      that.setData({
          src: res.tempFilePath
      })
      console.log(res.tempFilePath)
      that.tip("录音完成！")
  });

  this.innerAudioContext = wx.createInnerAudioContext();
  this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
  })

},
  
//日期

onDisplay() {
  this.setData({ show: true });
},
onClose() {
  this.setData({ show: false });
},
formatDate(date) {
  date = new Date(date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
},
onConfirm(event) {
  this.setData({
    show: false,
    date: this.formatDate(event.detail),
  });
  console.log(this.data)
},
})
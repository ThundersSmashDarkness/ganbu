Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    pickerHidden: true,
    chosen: '',
    showImage_url: '',
    agency:'',
    content:'',
    title:'',
    type:'',
    notice_content:''
  },

  uploadimg: function() {
    var that = this;
    //选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          showImage_url: tempFilePaths
        })
        //图片上传
        wx.uploadFile({
          url: 'http://localhost/common/uploadImg',//调用后台接口的路径
          method:'POST',
          filePath: that.data.showImage_url,
          name: 'file',//此处注意要与后台保持一致
          header: {
            "Content-Type": false,
          },
          //formdata:adds,
          success: function(res) {}
        })
      }
    })
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
  }
})
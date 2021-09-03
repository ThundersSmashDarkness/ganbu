// pages/shop/shop.js
Page({
  data:{
    // text:"这是一个页面"
    showModalStatus: false,
    actionSheetHidden:true,
    tag_id:[],
    tag_name:[],
    tages:[],
    actionSheetItems:[
      {bindtap:'Menu1',txt:'添加商品'},
      {bindtap:'Menu2',txt:'删除商品'}
    ],
    menu:''
  },
  CATES:[],
  actionSheetTap:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  actionSheetbindchange:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  bindMenu1:function(){
    this.setData({
      menu:1,
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  bindMenu2:function(){
    this.setData({
      menu:2,
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },




  powerDrawer: function (e) {  
    var currentStatu = e.currentTarget.dataset.statu;  
    this.util(currentStatu)  

    wx.request({
      url: 'http://47.97.152.69:8080/goods/tags',
      enableCache: true,
      enableHttp2: true,
      enableQuic: true,
      header: {
        'content-type':
        'application/json' //默认值
      },
      method: 'POST',
      timeout: 0,
      success: (res) => {

        console.log(res.data);
        console.log(res);

        var arr = [];

        this.CATES=res.data;

       arr.push(res.data);
       console.log(arr[0][1]);

       
      //  var arr1 = arr[0];
      //  console.log(arr1[0]);

      //   let tag_id=this.CATES.map(v=>v.id);
      //   console.log(tag_id);

      },
      fail: (res) => {console.log("失败");},
      complete: (res) => {},
    })
  },  
  util: function(currentStatu){  
    /* 动画部分 */  
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({  
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });  
      
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;  
  
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();  
  
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({  
      animationData: animation.export()  
    })  
      
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {  
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();  
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({  
        animationData: animation  
      })  
        
      //关闭  
      if (currentStatu == "close") {  
        this.setData(  
          {  
            showModalStatus: false  
          }  
        );  
      }  
    }.bind(this), 200)  
    
    // 显示  
    if (currentStatu == "open") {  
      this.setData(  
        {  
          showModalStatus: true  
        }  
      );  
    }  
  }  ,

  tagnameInput :function(e){
    this.data.tag_name=e.detail.value.tagname;
  },
  tagidInput :function(e){
    this.data.tag_id=e.detail.value.tagid;
  }

})
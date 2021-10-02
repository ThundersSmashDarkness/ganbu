// pages/shop/shop.js
let shop_data = require('shop_data');
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
    menu:'',
    active: 0,
    scrollTop:0,
    currentIndex: 0,
    right_index:0,
    leftMenuList:[],
    rightContent:[],
    bgc: 'gray',
    order:{
      goods:[],
      totalPrice: 0,
      totalNum: 0,
      date: ''
    }
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




  ,

  daleiChange(e){
    const index = e.detail.index;
    let leftMenuList = shop_data[index].children.map(v=>v.goods_name);
    let rightContent = shop_data[index].children;
    this.setData({
      leftMenuList,
      rightContent,
      currentIndex: 0, 
      scrollTop: 0
    })
    this.updata();
  },
  handleItemTap(e){
    const {index}= e.currentTarget.dataset;
    console.log(e);
    this.setData({
      currentIndex: index,
      right_index: index,
    })
  },
  handleNumEdit(e){
    const {id,operation} = e.currentTarget.dataset;
    let {rightContent,bgc,order} = this.data;
    let goods = order.goods;
    let index = 0;
    let index2 = 0; 
    for(let i = 0 ; i < rightContent.length ; i++){
      index = rightContent[i].children.findIndex(v=>v.goods_id == id)
      if(index != -1){
        rightContent[i].children[index].num += operation;
        order.totalPrice += rightContent[i].children[index].goods_price * operation;
        order.totalNum += operation;
        // 更新订单
        index2 = goods.findIndex(v => v.goods_id == rightContent[i].children[index].goods_id)
        if(index2 == -1){
          goods.push(rightContent[i].children[index])
        }else{
          goods[index2].num = rightContent[i].children[index].num
        }
        break;
      } 
    }
    if(order.totalNum == 0){
      bgc = 'gray'
    }else{
      bgc = 'var(--themeColor2)'
    }
    this.setData({
      order,
      rightContent,
      bgc
    })
    wx.setStorageSync('order', order)
  },
  onShow(){
    this.updata();
  },
  // 判断order
  judge(order){
    for(let i in order){
      return true
    }
    return false
  },
  onLoad(options) {
    //获取手机高度，以此来适应各种手机
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    let {leftMenuList,rightContent} = this.data;
    leftMenuList = shop_data[0].children.map(v=>v.goods_name);
    rightContent = shop_data[0].children;
    this.setData({
      leftMenuList,
      rightContent,
      height: screenHeight - 120,
    })
  },
  // 更新数据
  updata(){
    let order = wx.getStorageSync('order') || {};
    const {rightContent} = this.data;
    const flag = this.judge(order);
    if(!flag){
      rightContent.forEach(v=>{
        v.children.forEach(w=>{
          w.num = 0
        })
      })
      order={
        goods:[],
        totalPrice: 0,
        totalNum: 0,
        date: ''
      }
    }else{
      order.goods.forEach(v=>{
        rightContent.forEach(w=>{
          w.children.forEach(k=>{
            if(v.goods_name == k.goods_name){
              k.num = v.num
            }
          })
        })
      })
    }
    let bgc = "gray";
    if(order.totalNum > 0 ){
      bgc = "var(--themeColor2)"
    }
    this.setData({
      rightContent,
      bgc,
      order
    })
  }
})
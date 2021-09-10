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
    menu:'',
    active: 0,
    scrollTop:0,
    currentIndex: 0,
    leftMenuList:['饭类','面类','肉类','菜类'],
    rightContent:[
      {id:1, goods_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdealer0.autoimg.cn%2Fdl%2F122602%2Fnewsimg%2F130512469295591733.jpg&refer=http%3A%2F%2Fdealer0.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632643953&t=2fe554793f120713303cfe5f685ec244",goods_name:"鸡腿", goods_price:5, goods_detail:'这是一个鸡腿，它是怎么怎么怎么做的饿，非常好吃哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', num:0},
      {id:2, goods_url:"https://img1.baidu.com/it/u=2201661351,1806193528&fm=26&fmt=auto&gp=0.jpg",goods_name:"烤全鸡", goods_price:35, goods_detail:'这是一只烤全鸡，它是怎么怎么怎么做的饿，非常好吃哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', num:0},
      {id:3, goods_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170430%2F51ad7cf754794174a0825437a92f50b1_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632994493&t=b63962784517ee50c3be623d2201e217", goods_name:"炒饭", goods_price:13, goods_detail:'这是炒饭，它是怎么怎么怎么做的饿，非常好吃哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', num:0}
    ],
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

  handleItemTap(e){
    const {index}= e.currentTarget.dataset;
    console.log(e);
    this.setData({
      currentIndex:index,
      // 重新选择分类时 右侧滚动条在最顶端
      scrollTop: 0
    })
  },
  handleNumEdit(e){
    const {id,operation} = e.currentTarget.dataset;
    let {rightContent,bgc,order} = this.data;
    const index1 = rightContent.findIndex(v=>v.id==id);
    rightContent[index1].num += operation;
    order.totalPrice += rightContent[index1].goods_price * operation;
    order.totalNum += operation;
    if(order.totalNum == 0){
      bgc = 'gray'
    }else{
      bgc = 'var(--themeColor2)'
    }
    // 更新订单
    let goods = order.goods;
    let index2 = goods.findIndex(v=>v.id ==  rightContent[index1].id)
    if(index2 == -1){
      goods.push(rightContent[index1])
    }else{
      goods[index2].num = rightContent[index1].num
    }
    this.setData({
      order,
      rightContent,
      bgc
    })
    wx.setStorageSync('order', order)
  },
  onLoad: function (options) {
    // 获取商品数据并把商品信息存到缓存中（未实现）  方便查看商品详细时使用
    // 暂时先用这个代替
    const {rightContent} = this.data;
    wx.setStorageSync('rightContent', rightContent);
  },
})
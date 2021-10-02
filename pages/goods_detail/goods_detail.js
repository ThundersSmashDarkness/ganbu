let shop_data = require('../shop/shop_data.js')
Page({
  data: {
    goods:{},
    bgc: '',
    order:{
      goods:[],
      totalPrice: 0,
      totalNum: 0,
      date: ''
    }
  },
  handleNumEdit(e){
    const {operation} = e.currentTarget.dataset;
    let {order,goods,bgc} = this.data;
    goods.num += operation;
    order.totalNum += operation;
    order.totalPrice += goods.goods_price * operation;
    // 更新订单
    const index = order.goods.findIndex(v => v.goods_id == goods.goods_id)
    if(index == -1){
      order.goods.push(goods)
    }else{
      order.goods[index].num = goods.num
    }
    // order.goods.forEach(v=>{
    //   if(v.id == goods.id){
    //     v.num = goods.num
    //   }
    // })
    if(order.totalNum == 0){
      bgc = 'gray'
    }else{
      bgc = 'var(--themeColor2)'
    }
    this.setData({
      goods,
      order,bgc
    })
    wx.setStorageSync('order', order)
  },
  handlePay(){
    const {order} = this.data;
    let final_order = [];
    if(order.totalNum > 0){
      order.goods.forEach(v=>{
        if(v.num > 0){
          final_order.push(v);
        }
      })
      order.goods = final_order;
      wx.setStorageSync('order', order)
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请先选择商品',
        showCancel: false
      })
    }
  },
  onLoad(options){
    const order = wx.getStorageSync('order');
    let goods = '';
    shop_data.forEach(v=>{
      v.children.forEach(w=>{
        w.children.forEach(k=>{
          if(k.goods_id == options.page){
            goods = k
          }
        })
      })
    })
    let bgc = "gray";
    if(order.totalNum > 0 ){
      bgc = "var(--themeColor2)"
    }
    this.setData({
      goods,
      bgc
    })
    if(order){
      this.setData({
        order
      })
    }
  },
})
let falseData = require('falseData')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCompass: true,
    enableZoom: true,
    enableScroll: true,
    enableRotate: true,
    enableSatellite: false,
    latitude: "30.375415",
    longitude: "120.356703",//这个是你的经纬度
    markers:[
      {
        "name": "火灾避难区",
        "lon":120.35683650067137,
        "id": 900000003,
        "lat":30.36553600969695,
        "duoyu":"杭铣新村东侧",
        "iconPath":"../../icon/zaihai/fire.png",
        "width":"50",
        "height":"50"
      },
      {
        "name": "洪灾避难区",
        "lon": 120.35319854233549,
        "id": 900000004,
        "lat": 30.352389649058564,
        "duoyu": "浙江星野集团第一分公司北侧",
        "iconPath":"../../icon/zaihai/water.png",
        "width":"50",
        "height":"50"
      },
      {
        "name": "地质灾害避难区",
        "lon": 120.34040172312544,
        "id": 900000005,
        "lat": 30.363449028354996,
        "duoyu": "十五堡东侧",
        "iconPath":"../../icon/zaihai/ground.png",
        "width":"80",
        "height":"80"
      }
  ],
    polygons: [
    {
      points: [{
        longitude: 120.36053650067137,
        latitude: 30.36253600969695
      }, {
        longitude: 120.36853650067137,
        latitude: 30.36753600969695
      }, {
        longitude: 120.36053650067137,
        latitude: 30.37053600969695
      },
      {
        longitude: 120.35053650067137,
        latitude: 30.37053600969695
      }, {
        longitude: 120.35053650067137,
        latitude: 30.36453600969695
      }],
      fillColor: "#F2D7BC99",
      strokeColor: "#FFF",
      strokeWidth: 2,
      zIndex: 1
    },
    {
      points: [{
        longitude: 120.35719854233549,
        latitude: 30.348389649058564
      }, {
        longitude: 120.35519854233549,
        latitude: 30.358389649058564
      }, {
        longitude: 120.35019854233549,
        latitude: 30.356389649058564
      },
      {
        longitude: 120.34819854233549,
        latitude: 30.348389649058564
      }],
      fillColor: "#00BFFF68",
      strokeColor: "#FFF",
      strokeWidth: 2,
      zIndex: 1
    },
    {
      points: [{
        longitude: 120.34440172312544,
        latitude: 30.362449028354996
      }, {
        longitude: 120.34440172312544,
        latitude: 30.369449028354996
      }, {
        longitude: 120.33640172312544,
        latitude: 30.369449028354996
      },
      {
        longitude: 120.33640172312544,
        latitude: 30.360449028354996
      }],
      fillColor: "#DAA52068",
      strokeColor: "#FFF",
      strokeWidth: 2,
      zIndex: 1
    }]
  },
 
  escape:function (){

    wx.navigateTo({
      url: '../escapeSituation/escapeSituation',
    })

  },

  mapView: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.data.userAddress = res.address + res.name + ',latitude=' + res.latitude
          + ",longitude=" + res.longitude;
          console.log("您选择的定位地址 = " + that.data.userAddress);
          console.log(res.latitude,res.longitude)
      },
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    //  wx.getLocation({
    //    type: "wgs84",
    //    success: function(res){
    //      var latitude = res.latitude;
    //      var longitude = res.longitude;
    //     //console.log(res.latitude);
    //      that.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude,

    //      })
    //      console.log(that.data.polygons[0].points[0]);
    //    }
    //  })
    this.locationAuth();
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






  toggleShowCompass() {
    this.setData({
      showCompass: !this.data.showCompass
    })
  },
  toggleZoom() {
    this.setData({
      enableZoom: !this.data.enableZoom
    })
  },
  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll
    })
  },
  toggleRotate() {
    this.setData({
      enableRotate: !this.data.enableRotate
    })
  },
  toggleSatellite() {
    this.setData({
      enableSatellite: !this.data.enableSatellite
    })
  },

















  locationAuth:function(){
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      this.showMaps();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          this.showMaps();
        }
        else {
          //调用wx.getLocation的API
          this.showMaps();
        }
      }
    })
  },
  //定位
  showMaps:function(){
    var that = this;
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位  定位成功，更新定位结果
      success: (res) => {

        //使用假地址
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
          hasMarkers: true,
          markers:this.getFalseDataLocations()
        })
        
      },
      // 定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败le",
         
        })
      },
      complete: function () {
        //隐藏加载框
        wx.hideLoading()
      }
    })
  },
  //获取mark标记点本地假数据哦
  getFalseDataLocations(){
    let myMarker = [];
    for (let item of falseData){
      //创建标记点
       let singleMark = this.createMyMarker(item);
       myMarker.push(singleMark)
    }
    let  that =this ;
    that.setData({
      markers:myMarker
    })
    return myMarker;
  },
  //创建标记点
  createMyMarker(point){
    let mark = {
      id: point.id || 0,
      name: point.name || 0,
      iconPath: point.iconPath || 0,
      latitude: point.lat || 0,
      longitude: point.lon || 0,
      width: point.width,
      height: point.height
    };
    return mark;

  },

  gotohere:function(res){    
    console.log(res);    
 
       let name = ''; // 获得点一下的markers名字    
       let markerId = res.markerId;// 获得点一下的markers  id    
       console.log(res.markerId);  
       let markers = res.currentTarget.dataset.markers;// 获得markers目录  
         for (let item of markers){     
            if (item.id === markerId) {       
               let lat = item.lat;      
                let  lon = item.lon;      
                   name = item.name;     
                      wx.openLocation({ 
                        // 进入微信内嵌地形图，完成导航功能（在内嵌地形图里边打开地图手机软件）       
                           latitude: Number(lat),         
                            longitude: Number(lon),         
                             name:name,        
                               success:function(res){           
                                  console.log(res);        
                                  },     fail:function(res){     
                                           console.log(res);        
                                            }      
                                            })       
                                             break;     
                                             }   
                                             }  
                                            },
})
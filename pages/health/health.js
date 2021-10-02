var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
    main: {
        title: '老人群体年龄分布柱状图',
        data: [78, 80, 52, 20],
        categories: [  '61岁-65岁','66岁-75岁','76岁-85岁','大于85岁']
    },
    sub: [ 
         {
            title: '61岁至65岁老人年龄分布',
            data: [22, 15, 16, 10, 15],
            categories: ['61', '62', '63', '64', '65']
        },{
        title: '66岁至75岁老人年龄分布',
        data: [10, 8, 5, 7, 2, 12,6,8,12,10],
        categories: ['66', 67, '68', '69', '70', '71','72','73','74','75']
    }, {
        title: '76岁至85岁老人年龄分布',
        data: [2, 3, 7, 5, 4, 10,2,7,6,6],
        categories: ['76', '77', '78', '79', '80', '81','82','83','84','85']                
    },{
        title: '85岁以上老人年龄分布',
        data: [2, 3, 3, 3, 5, 2,1,1],
        categories: ['86', '87', '88', '89', '90', '92','93','95']
    },]
};



Page({
    data: {
        chartTitle: '老人群体年龄分布柱状图',
        isMainChartDisplay: true
    },
    upper85detail:function(){

        wx.navigateTo({
          url: 'upper85/upper85',
        })
  
      },
    backToMainChart: function () {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
                name: '人数',
                data: chartData.main.data,
                format: function (val, name) {
                    return val + '人';
                }
            }]
        });
    },
    touchHandler: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                    name: '人数',
                    data: chartData.sub[index].data,
                    format: function (val, name) {
                        return val+ '人';
                    }
                }]
            });

        }
    },
    onReady: function (e) {
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '人数',
                data: chartData.main.data,
                format: function (val, name) {
                    return val + '人';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '人';
                },
                title: 'hello',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});
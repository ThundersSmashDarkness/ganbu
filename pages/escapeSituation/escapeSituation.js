var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var escapeChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(escapeChart.getCurrentDataIndex(e));
    },        
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        escapeChart = new wxCharts({
            animation: true,
            canvasId: 'escapeCanvas',
            type: 'pie',
            series: [{
                name: '失联人数',
                data: 5,
            }, {
                name: '正在撤离中人数占比',
                data: 35,
            }, {
                name: '已撤离到安全区域人数占比',
                data: 99,
            }, {
                name: '还在家中人数',
                data: 63,
            }, ],
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
    }
});
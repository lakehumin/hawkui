/**
 * Created by LakeHm on 2016/12/1.
 */
define(['angular','jquery','highcharts'], function() {
    angular.module('home.deviceInfo.detail', [])
        .controller('DeviceInfoDetailCtrl', ['$scope','$http','$stateParams', function ($scope,$http,$stateParams) {
            var vm = {};
            $scope.vm = vm;
            vm.deviceInfo={};
            vm.deviceHistory=[];
            vm.deviceBatteryHistory=[];
            vm.deviceVoltageHistory=[];
            vm.imgsrc = 'monitorImg/common.jpg';

            var date = new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000); //获取近来30天历史数据

            getDetail();
            drawHistory();
            getHistory();
            getImgsrc();

            function getDetail() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/detail?id='+$stateParams.id;
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.deviceInfo = data.data;
                    }
                });
            }

            function drawHistory() {
                $('#container1').highcharts({
                    chart: {
                        zoomType: 'x',
                        spacingRight: 20
                    },
                    credits:{
                        enabled:false // 禁用版权信息
                    },
                    title: {
                        text: '电池电量随时间变化曲线',
                        style:{
                            fontSize:'20px',
                            fontWeight:"bold",
                            fontFamily:'微软雅黑'
                        }
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            '点击并拖动来放大' :
                            '双指操作放大'
                    },
                    xAxis: {
                        type: 'datetime',
                        maxZoom: 14 * 24 * 3600000, // fourteen days
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        title: {
                            text: '电量剩余（单位：%）'
                        }
                    },
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            lineWidth: 1,
                            marker: {
                                enabled: false
                            },
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        name: '电压值',
                        pointInterval: 24 * 3600 * 1000,
                        pointStart: Date.UTC(date.getYear(), date.getMonth(), date.getDate()),
                        data: []
                    }]
                });

                $('#container2').highcharts({
                    chart: {
                        zoomType: 'x',
                        spacingRight: 20
                    },
                    credits:{
                        enabled:false // 禁用版权信息
                    },
                    title: {
                        text: '电压随时间变化曲线',
                        style:{
                            fontSize:'20px',
                            fontWeight:"bold",
                            fontFamily:'微软雅黑'
                        }
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            '点击并拖动来放大' :
                            '双指操作放大'
                    },
                    xAxis: {
                        type: 'datetime',
                        maxZoom: 14 * 24 * 3600000, // fourteen days
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        title: {
                            text: '电压值（单位：V）'
                        }
                    },
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            lineWidth: 1,
                            marker: {
                                enabled: false
                            },
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        name: '电压值',
                        pointInterval: 24 * 3600 * 1000,
                        pointStart: Date.UTC(date.getYear(), date.getMonth(), date.getDate()),
                        data: []
                    }]
                });
            }

            function getHistory() {

                var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/devicehistory?id='+$stateParams.id
                    +'&date='+date.getTime();
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.deviceHistory = data.data;
                        updateHistory();
                    }
                });
            }

            function updateHistory() {
                var i = 0, j = 0;
                var tempdate = date;
                for(; i < 30; i ++) {
                    if(vm.deviceHistory[j] && tempdate.toDateString() === new Date(vm.deviceHistory[j].date).toDateString()) {
                        vm.deviceBatteryHistory[i] = parseFloat(vm.deviceHistory[j].battery);
                        vm.deviceVoltageHistory[i] = parseFloat(vm.deviceHistory[j].voltage);
                        j ++;
                    } else {
                        vm.deviceBatteryHistory[i] = 0;
                        vm.deviceVoltageHistory[i] = 0;
                    }
                    tempdate = new Date(tempdate.getTime() + 24*3600*1000);
                }

                $('#container1').highcharts().series[0].setData(vm.deviceBatteryHistory);
                $('#container2').highcharts().series[0].setData(vm.deviceVoltageHistory);
            }

            function getImgsrc() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/img?id='+$stateParams.id
                    +'&date='+new Date().getTime();
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.imgsrc = data.data.img_path;
                    }
                });

            }
        }])
        .filter('stateFilter', function(){
            var filter = function(isOnLine){
                if(isOnLine == 1) {
                    return '在线';
                } else {
                    return '离线';
                }
            };
            return filter;
        });
});
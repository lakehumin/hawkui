/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('home.monitor', [])
        .controller('MonitorCtrl', ['$scope','$http','$timeout','$interval', function ($scope,$http,$timeout,$interval) {
            var vm = {};
            $scope.vm = vm;

            var gaugeOptions = {
                chart: {
                    type: 'solidgauge',
                    // plotBackgroundColor: '#FCFFC5'
                },
                credits:{
                    enabled:false // 禁用版权信息
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '120%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.1, '#DF5353'], // red
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#55BF3B'] // green
                    ],
                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16
                    }
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };

            vm.deviceList=[];
            vm.deviceDeviceList=[];

            //获取设备列表信息
            function getDeviceList() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/allinfo';
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.deviceList = data.data;
                        $timeout(showDevice);   //确保angular视图已刷新，加一个delay
                    }
                });
            }
            getDeviceList();
            var timer = $interval(getDeviceList, 3000); //定时刷新
            $scope.$on(
                "$destroy",
                function() {
                    $interval.cancel(timer);    //清除定时器
                }
            );

            //画仪表图
            function showDevice() {
                for(var i = 0; i < vm.deviceList.length; i ++) {
                    $('#container'+vm.deviceList[i].terminal_id+'1').highcharts(Highcharts.merge(gaugeOptions, {
                        yAxis: {
                            min: 0,
                            max: 100,
                            title: {
                                text: '电池电量',
                                style:{
                                    fontSize:'15px',
                                    fontFamily:'微软雅黑'
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'battery',
                            data: [80],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:20px;color:' +
                                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                                '<span style="font-size:15px;color:silver">%</span></div>'
                            },
                            tooltip: {
                                valueSuffix: '%'
                            }
                        }]
                    }));

                    $('#container'+vm.deviceList[i].terminal_id+'2').highcharts(Highcharts.merge(gaugeOptions, {
                        yAxis: {
                            min: 0,
                            max: 10,
                            title: {
                                text: '电压',
                                style:{
                                    fontSize:'15px',
                                    fontFamily:'微软雅黑'
                                }
                            }
                        },
                        series: [{
                            name: 'voltage',
                            data: [6.0],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:20px;color:' +
                                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                                '<span style="font-size:15px;color:silver">V</span></div>'
                            },
                            tooltip: {
                                valueSuffix: 'v'
                            }
                        }]
                    }));
                }

                getDevicetailList();
            }

            function getDevicetailList() {
                var detailurl = 'http://'+$scope.ip+':'+$scope.port+'/device/search/alldetail';
                $http.get(detailurl).success(function(data){
                    if(data.success) {
                        vm.deviceDeviceList = data.data;
                        updateDeviceInfo();
                    }
                });
            }

            function updateDeviceInfo() {
                for(var i = 0; i < vm.deviceList.length; i ++) {
                    vm.deviceList[i].battery = '0';
                    vm.deviceList[i].voltage = '0';
                    vm.deviceList[i].workstate = 'Exception';
                    for(var j = 0; j < vm.deviceDeviceList.length; j ++) {
                        if(vm.deviceDeviceList[j].id === vm.deviceList[i].terminal_id) {
                            vm.deviceList[i].battery = vm.deviceDeviceList[j].battery;
                            vm.deviceList[i].voltage = vm.deviceDeviceList[j].voltage;
                            vm.deviceList[i].workstate = vm.deviceDeviceList[j].workstate;
                            break;
                        }
                    }

                    $('#container'+vm.deviceList[i].terminal_id+'1')
                        .highcharts().series[0].points[0].update(parseFloat(vm.deviceList[i].battery));
                    $('#container'+vm.deviceList[i].terminal_id+'2')
                        .highcharts().series[0].points[0].update(parseFloat(vm.deviceList[i].voltage));
                }
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
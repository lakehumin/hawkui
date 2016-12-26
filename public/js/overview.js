/**
 * Created by LakeHm on 2016/11/29.
 */
define(['angular','bmap'], function() {
    angular.module('home.overview', ['angular-baidu-map'])
        .controller('OverViewCtrl', ['$scope','$http','$state', function ($scope,$http,$state) {
            var vm = {};
            $scope.vm = vm;

            //在线地图
            // $scope.mapReady = function (map) {
            //     map.enableScrollWheelZoom();
            //     map.addControl(new BMap.NavigationControl());
            //     map.addControl(new BMap.ScaleControl());
            //     map.addControl(new BMap.OverviewMapControl());
            //     map.addControl(new BMap.MapTypeControl());
            //
            //     var myIcon = new BMap.Icon("img/tieta3.jpg", new BMap.Size(60, 90), {
            //
            //         imageSize: new BMap.Size(60, 92)
            //     });
            //
            //     var point = new BMap.Point(118.966407, 32.115247);//109.40438,,24.33247
            //     map.centerAndZoom(point, 15);
            //     var marker = new BMap.Marker(point,{icon:myIcon});
            //     marker.addEventListener("click", function(){
            //         $state.go('deviceInfo.detail',{id:'XXX'},{});
            //     });
            //
            //     var opts = {
            //         width : 250,     // 信息窗口宽度
            //         height: 100,     // 信息窗口高度
            //         title : "设备：XXX"  // 信息窗口标题
            //     }
            //     var infoWindow = new BMap.InfoWindow("状态：在线", opts);  // 创建信息窗口对象
            //     map.openInfoWindow(infoWindow, map.getCenter());
            //     map.addOverlay(marker);
            // };

            //离线地图
            var map = new BMap.Map("container",{minZoom:11,maxZoom:13,mapType: BMAP_SATELLITE_MAP});      //设置卫星图为底图
            var point = new BMap.Point(109.22,23.75214);    // 创建点坐标
            map.centerAndZoom(point,13);                     // 初始化地图,设置中心点坐标和地图级别。

            var myIcon = new BMap.Icon("img/tieta2.jpg", new BMap.Size(60, 90));
            map.addControl(new BMap.NavigationControl());
            map.enableScrollWheelZoom();                  // 启用滚轮放大缩小。
            map.enableKeyboard();                         // 启用键盘操作。
            map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));
            var marker = new BMap.Marker(point,{icon:myIcon});
            marker.addEventListener("click", function(){
                // $state.go('deviceInfo.detail',{id:'XXX'},{});
            });
            map.addOverlay(marker);
            var opts = {
                width : 130,     // 信息窗口宽度
                height: 250,     // 信息窗口高度
                title : "详细信息" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
                message:""
            }

            vm.deviceInfo={
                id:'XXX',
                location:'XXX',
                tel:'15264684556',
                state:true,
                battery:'23%',
                voltage:'7.6V',
                workstate:'normal'
            };
            var content = '<table style="font-size: 15px">'+
                '<tr><td>id</td>'+
                '<td>'+vm.deviceInfo.id+'</td></tr>'+
                '<tr><td>电话号码&nbsp&nbsp&nbsp&nbsp</td>'+
                '<td>'+vm.deviceInfo.tel+'</td></tr>'+
                '<tr><td>位置</td>'+
                '<td>'+vm.deviceInfo.location+'</td></tr>'+
                '<tr><td>在线状态</td>'+
                '<td>'+vm.deviceInfo.state+'</td></tr>'+
                '<tr><td>电池</td>'+
                '<td>'+vm.deviceInfo.battery+'</td></tr>'+
                '<tr><td>电压</td>'+
                '<td>'+vm.deviceInfo.voltage+'</td></tr>'+
                '<tr><td>工作状态</td>'+
                '<td>'+vm.deviceInfo.workstate+'</td></tr>'+
                '</table>'
            var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
            marker.addEventListener("click", function(){
                map.openInfoWindow(infoWindow,point); //开启信息窗口
            });


        }]);
});
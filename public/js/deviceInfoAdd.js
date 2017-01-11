/**
 * Created by LakeHm on 2016/12/1.
 */
define(['angular'], function() {
    angular.module('home.deviceInfo.add', [])
        .controller('DeviceInfoAddCtrl', ['$scope','$http','$state', function ($scope,$http,$state) {
            var vm = {};
            $scope.vm = vm;
            vm.device={};

            vm.addDevice = function (device) {
                if(!device.id) {
                    alert('请输入设备编号');
                    return;
                }
                if(!device.tel) {
                    alert('请输入设备使用电话号码');
                    return;
                }
                if(!device.location) {
                    alert('请输入设备所在地理位置');
                    return;
                }
                addDevice(vm.device);
            }

            function addDevice(device) {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/device/add?id=' + device.id +
                    '&tel=' + encodeURIComponent(device.tel) + '&location=' + device.location;
                $http.get(url).success(function(data){
                    if(data.success) {
                        alert('成功添加设备'+device.id);
                        $state.go('deviceInfo',{},{ reload: true });
                    } else {
                        alert('已存在设备'+device.id+'！请输入新的设备编号！');
                    }
                });
            }


        }]);
});
/**
 * Created by LakeHm on 2016/11/27.
 */
define(['angular'], function() {
    angular.module('home.deviceInfo.modify', [])
        .controller('DeviceInfoModifyCtrl', ['$scope','$http','$stateParams','$state',
            function ($scope,$http,$stateParams,$state) {
                var vm = {};
                $scope.vm = vm;
                vm.device={};
                getDevice();

                vm.updateDevice = function (device) {
                    if(!device.tel) {
                        alert('请输入设备使用电话号码');
                        return;
                    }
                    if(!device.location) {
                        alert('请输入设备所在地理位置');
                        return;
                    }
                    updateDevice(vm.device);
                }
                function updateDevice(device) {
                    var url = 'http://'+$scope.ip+':'+$scope.port+'/device/update?id=' + device.id +
                        '&tel=' + encodeURIComponent(device.tel) + '&location=' + device.location;
                    $http.get(url).success(function(data){
                        if(data.success) {
                            alert('设备信息修改成功');
                            $state.go('deviceInfo',{},{ reload: true });
                        }
                    });
                }

                vm.deleteDevice = function () {
                    var url = 'http://'+$scope.ip+':'+$scope.port+'/device/delete?id=' + vm.device.id;
                    $http.get(url).success(function(data){
                        if(data.success) {
                            alert('设备 '+vm.device.id+' 删除成功');
                            $state.go('deviceInfo',{},{ reload: true });
                        }
                    });
                }

                function getDevice() {
                    var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/devdetail?id=' + $stateParams.id;
                    $http.get(url).success(function(data){
                        if(data.success) {
                            vm.device.id = data.data.terminal_id,
                            vm.device.tel = data.data.tel_num,
                            vm.device.location = data.data.location
                        }
                    });
                }
            }]);
});
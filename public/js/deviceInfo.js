/**
 * Created by LakeHm on 2016/12/1.
 */
define(['angular'], function() {
    angular.module('home.deviceInfo', ['home.deviceInfo.detail'])
        .controller('DeviceInfoCtrl', ['$scope','$http', function ($scope,$http) {
            var vm = {};
            $scope.vm = vm;
            vm.deviceList=[{
                id:'XXX',
                location:'XXX',
                state:true
            },
            {
                id:'YYY',
                location:'YYY',
                state:false
            }];

            var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/allinfo';
            $http.get(url).success(function(data){
                if(data.success) {
                    vm.deviceList = data.data;
                }
            });

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
/**
 * Created by LakeHm on 2016/12/1.
 */
define(['angular'], function() {
    angular.module('home.deviceInfo.detail', [])
        .controller('DeviceInfoDetailCtrl', ['$scope','$http','$stateParams', function ($scope,$http,$stateParams) {
            var vm = {};
            $scope.vm = vm;
            vm.deviceInfo={
                id:'XXX',
                location:'XXX',
                tel:'15264684556',
                state:true,
                battery:'23%',
                voltage:'7.6V',
                workstate:'normal'
            };

            var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/detail?id='+$stateParams.id;
            $http.get(url).success(function(data){
                if(data.success) {
                    vm.deviceInfo = data.data;
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
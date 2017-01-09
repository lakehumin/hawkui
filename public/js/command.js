/**
 * Created by LakeHm on 2016/12/1.
 */
define(['angular'], function() {
    angular.module('home.command', [])
        .controller('CommandCtrl', ['$scope','$http', function ($scope,$http) {
            var vm = {};
            $scope.vm = vm;
            vm.deviceList=[];

            var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/allinfo';
            $http.get(url).success(function(data){
                if(data.success) {
                    vm.deviceList = data.data;
                }
            });

        }]);
});
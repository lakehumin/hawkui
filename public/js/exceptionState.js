/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('home.exception.state', [])
        .controller('ExceptionStateCtrl', ['$scope','$http','$state','$stateParams', function ($scope,$http,
                                                                                               $state,$stateParams) {
            var vm = {};
            $scope.vm = vm;
            vm.event = {};
            vm.begin = {
                username:$scope.user.username
            };
            vm.end = {
                record:''
            };

            getEvent();
            function getEvent() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/alarm/search?searchcode=4&id='+$stateParams.id;
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.event = data.data;
                    }
                });
            }

            vm.beginEvent = function () {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/alarm/update/begin?id='+$stateParams.id
                    +'&state=1&begindate='+new Date().getTime()+'&user='+vm.begin.username;
                $http.get(url).success(function(data){
                    if(data.success) {
                        alert("开始处理");
                        $state.go('exception.list',{code:$scope.code},{ reload: true });
                    }
                });
            }

            vm.endEvent = function () {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/alarm/update/end?id='+$stateParams.id
                    +'&state=2&enddate='+new Date().getTime()+'&record='+vm.end.record;
                $http.get(url).success(function(data){
                    if(data.success) {
                        alert("完成处理");
                        $state.go('exception.list',{code:$scope.code},{ reload: true });
                    }
                });
            }
        }])
        .filter('stateDisplayFilter', function(){
            var filter = function(state){
                switch (state) {
                    case 0 :
                        return '未处理';
                    case 1 :
                        return '处理中...';
                    case 2 :
                        return '处理完毕';
                }
            };
            return filter;
        })
        .filter('colorFilter', function(){
            var filter = function(state){
                switch (state) {
                    case 0 :
                        return '处理';
                    case 1 :
                    case 2 :
                        return '查看';
                }
            };
            return filter;
        });
});
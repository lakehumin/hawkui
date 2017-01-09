/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('home.exception.list', ['home.exception.state'])
        .controller('ExceptionListCtrl', ['$scope','$http','$stateParams', function ($scope,$http,$stateParams) {
            var vm = {};
            $scope.vm = vm;
            vm.list = [];
            $scope.code = $stateParams.code;

            getList();
            function getList() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/alarm/search?searchcode='+$stateParams.code;
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.list = data.data;
                    }
                });
            }
        }])
        .filter('stateFilter', function(){
            var filter = function(state){
                switch (state) {
                    case 0 :
                        return '未处理';
                    case 1 :
                        return '处理中';
                    case 2 :
                        return '已处理';
                }
            };
            return filter;
        })
        .filter('operationFilter', function(){
            var filter = function(state){
                switch (state) {
                    case 0 :
                        return '开始处理';
                    case 1 :
                        return '完成处理';
                    case 2 :
                        return '查看结果';
                }
            };
            return filter;
        })
        .filter('recordFilter', function(){
            var filter = function(record){
                if(!record) return '';
                if(record.length > 10) {
                    return record.substring(0,7) +'...';
                } else {
                    return record;
                }
            };
            return filter;
        });
});
/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('home.userManage', ['home.userManage.userOperation','home.userManage.addUser'])
        .controller('UserManageCtrl', ['$scope','$http', function ($scope,$http) {
            var vm = {};
            $scope.vm = vm;

            vm.userList = [
                {
                    "id": 1,
                    "username": "admin",
                    "password": "admin",
                    "type": "root"
                }
            ];

            function getNameList() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/user/getAll';
                $http.get(url)
                    .success(function(data){
                        vm.userList = data;
                    });
            }
            getNameList();
            
            vm.addUser = function () {
                
            }
        }]);
});
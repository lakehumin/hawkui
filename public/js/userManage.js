/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('hawkui.home.userManage', ['ui.router'])
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
                $http.get('http://localhost:8088/user/getAll')
                    .success(function(data){
                        vm.userList = data;
                    });
            }
            getNameList();
        }]);
});
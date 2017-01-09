/**
 * Created by LakeHm on 2016/11/27.
 */
define(['angular'], function() {
    angular.module('home.userManage.userOperation', [])
        .controller('UserOperationCtrl', ['$scope','$http','$stateParams','$state',
            function ($scope,$http,$stateParams,$state) {
            var vm = {};
            $scope.vm = vm;
            vm.user = {};

            vm.updateUser = function (user) {
                if(!user.password) {
                    alert('请输入密码');
                    return;
                }
                if(!vm.confirmPassword) {
                    alert('请再次输入密码');
                    return;
                }
                if(user.password != vm.confirmPassword) {
                    alert('两次密码输入不一致');
                    return;
                }
                updateUser(vm.user);
            }
            function updateUser(user) {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/user/update?username=' + user.username +
                    '&password=' + user.password + '&tel=' + user.tel + '&realname=' + user.realname;
                $http.get(url).success(function(data){
                    if(data.success) {
                        alert('密码修改成功');
                        $state.go('userManage',{},{ reload: true });
                    }
                });
            }

            vm.deleteUser = function () {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/user/delete?username=' + $stateParams.username;
                $http.get(url).success(function(data){
                    if(data.success) {
                        alert('用户 '+$stateParams.username+' 删除成功');
                        $state.go('userManage',{},{ reload: true });
                    }
                });
            }

            function getUser() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/user/search?username=' + $stateParams.username;
                $http.get(url).success(function(data){
                    vm.user = data;
                    vm.user.password = '';
                });
            }

            getUser();
        }]);
});
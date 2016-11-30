/**
 * Created by LakeHm on 2016/11/27.
 */
define(['angular'], function() {
    angular.module('home.userManage.addUser', [])
        .controller('AddUserCtrl', ['$scope','$http','$state', function ($scope,$http,$state) {
            var vm = {};
            $scope.vm = vm;
            vm.user={};
            vm.addUser = function (user) {
                if(!user.username) {
                    alert('请输入用户名');
                    return;
                }
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
                addUser(vm.user);
            }
            function addUser(user) {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/user/add?username=' + user.username +
                    '&password=' + user.password;
                $http.get(url).success(function(data){
                    if(data.success) {
                        alert('成功添加用户'+user.username);
                        $state.go('userManage',{},{ reload: true });
                    }
                });
            }
        }]);
});
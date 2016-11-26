/**
 * Created by LakeHm on 2016/11/4.
 */
define(['jquery','angular','router','cookies'], function() {
    angular.module('hawkui', ['ui.router','ngCookies','hawkui.home.userManage'])
        .config(['$stateProvider',function ($stateProvider) {
            $stateProvider.state('home', {
                templateUrl: '../views/login.html',
                url: "/home",
                controller: "HomeCtrl"
            }).state('home.userManage', {
                templateUrl: '../views/userManage.html',
                url: "/userManage",
                controller: "UserManageCtrl"
            })
            .state('home.overview', {
                templateUrl: '../views/overview.html',
                url: "/overview",
                controller: function () {

                }
            });
        }])
        .controller('HomeCtrl', ['$scope','$http','$window','$cookieStore',
            function ($scope,$http,$window,$cookieStore) {
            //检测用户登录
            $scope.loginDetail = {
                username: '',
                password: '',
                setCookie:false
            }
            $scope.user = {
                username: '',
                password: '',
                role: ''
            };
            var user = $cookieStore.get("user");
            if(user) {
                $window.sessionStorage["user"] = JSON.stringify(user);
                $scope.user = user;
            }
            if($window.sessionStorage["user"])  {
                $scope.user = JSON.parse($window.sessionStorage["user"]);
            }
            if($scope.user.username == '') {
                //跳转到登录
                $('#myModal').modal({backdrop: 'static', keyboard: false});
            }
            $scope.login = function (loginDetail) {
                //检测用户名密码填写错误
                if(loginDetail.username == '') {
                    alert('用户名为空');
                    return ;
                }
                if(loginDetail.password == '') {
                    alert('密码为空');
                    return ;
                }

                var url = 'http://localhost:8088/user/login?username=' + loginDetail.username +
                    '&password=' + loginDetail.password;
                $http.get(url)
                .success(function(data) {
                    if (data.success) {
                        var loginUser = {};
                        loginUser.username = data.data.username;
                        loginUser.password = data.data.password;
                        loginUser.role = data.data.type;
                        $scope.user = loginUser;
                        $window.sessionStorage["user"] = JSON.stringify(loginUser);
                        //判断是否为自动登录
                        if(loginDetail.setCookie) {
                            $cookieStore.put("user", loginUser);
                        }
                        $('#myModal').modal('hide');
                    } else {
                        alert('用户名或密码错误');
                    }
                });
            };

            //用户登出
            $scope.logout = function () {
                $cookieStore.remove("user");
                var user = {
                    username: '',
                    password: '',
                    role: ''
                };
                $window.sessionStorage["user"] = JSON.stringify(user);
                $scope.user = user;
                $('#myModal').modal('show');
            }
        }]);
    angular.bootstrap(document,['hawkui']);
});
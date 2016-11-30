/**
 * Created by LakeHm on 2016/11/4.
 */
define(['jquery','angular','router','cookies'], function() {
    angular.module('home', ['ui.router','ngCookies','home.userManage','home.overview'])
        .config(['$stateProvider',function ($stateProvider) {
            $stateProvider.state('userManage', {
                templateUrl: '../views/userManage.html',
                url: "/userManage",
                controller: "UserManageCtrl"
            })
            .state('userManage.userOperation', {
                templateUrl: '../views/userOperation.html',
                url: "/userOperation/{username}",
                controller: "UserOperationCtrl"
            })
            .state('userManage.addUser', {
                templateUrl: '../views/addUser.html',
                url: "/addUser",
                controller: "AddUserCtrl"
            })
            .state('overview', {
                templateUrl: '../views/overview.html',
                url: "/overview",
                controller: "OverViewCtrl"
            });
        }])
        .controller('HomeCtrl', ['$rootScope','$scope','$http','$window','$cookieStore','$state',
            function ($rootScope,$scope,$http,$window,$cookieStore,$state) {
            //java后台ip
            $scope.ip = '114.212.118.115';
            $scope.port = '8088';

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

                var url = 'http://'+$scope.ip+':'+$scope.port+'/user/login?username=' + loginDetail.username +
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
                        $state.go('overview');
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

            //订阅状态转移事件用于用户状态跳转时的权限认证
            $rootScope.$on('$stateChangeStart', function(event, toState) {
                if(toState.name == 'userManage') {
                    if($scope.user.role != 'root') {
                        event.preventDefault();
                        alert('权限不够，请使用root账户登录');
                    }
                }
            });

        }]);
    angular.bootstrap(document,['home']);
});
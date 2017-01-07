/**
 * Created by LakeHm on 2016/11/4.
 */
define(['jquery','angular','router','cookies','bootstrap'], function() {
    angular.module('home', ['ui.router','ngCookies','home.userManage','home.deviceInfo','home.overview',
        'home.monitor'])
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
            .state('deviceInfo', {
                templateUrl: '../views/deviceInfo.html',
                url: "/deviceInfo",
                controller: "DeviceInfoCtrl"
            })
            .state('deviceInfo.detail', {
                templateUrl: '../views/deviceInfoDetail.html',
                url: "/detail/{id}",
                controller: "DeviceInfoDetailCtrl"
            })
            .state('deviceInfo.add', {
                templateUrl: '../views/deviceInfoAdd.html',
                url: "/add",
                controller: "DeviceInfoAddCtrl"
            })
            .state('deviceInfo.modify', {
                templateUrl: '../views/deviceInfoModify.html',
                url: "/modify/{id}",
                params:{"device":null},
                controller: "DeviceInfoModifyCtrl"
            })
            .state('deviceInfo.img', {
                templateUrl: '../views/deviceInfoImg.html',
                url: "/historyImg/{id}",
                controller: "DeviceInfoImgCtrl"
            })
            .state('monitor', {
                templateUrl: '../views/monitor.html',
                url: "/monitor",
                controller: "MonitorCtrl"
            })
            .state('overview', {
                templateUrl: '../views/offlineMap.html',
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
                        $state.go('monitor');
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

            $scope.searchText = '';
            $scope.search = function () {
                switch ($scope.searchText) {
                    case '监控':
                        $state.go('monitor');
                        break;
                    case '用户':
                        $state.go('userManage');
                        break;
                    case '设备':
                        $state.go('deviceInfo');
                        break;
                    case '地图':
                        $state.go('overview');
                        break;
                }

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
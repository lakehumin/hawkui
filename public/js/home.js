/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('myApp', ['ui.router'])
        .config(['$stateProvider',function ($stateProvider) {
            $stateProvider.state('contacts', {
                templateUrl: '../views/home.html',
                url: "/contact",
                controller: function($scope){
                    $scope.title = 'My Contacts';
                }
            });
        }])
        .controller('MyController', ['$scope','$http','$q', function ($scope,$http,$q) {
            $scope.name = 'Change the name';

            $scope.getname = function () {
                // getJson("http://localhost:8088/db/search?name=lake&age=24").then(function (data) {
                //     alert(data.age);
                // });
                var url = 'http://localhost:8088/db/search?name=lake&age=24';
                $http.get(url)
                    .success(function(data){
                        alert(data.age);
                    });
            }

            function getJson(url) {
                var deferred = $q.defer();
                $http.get(url)
                    .success(function(d){
                        deferred.resolve(d);
                    });
                return deferred.promise;
            }
            // $http.get("http://localhost:8088/db/search?name=lake&age=24").success(function (data) {
            //     console.log(data.age);
            // });

        }]);
    angular.bootstrap(document.body,['myApp']);
});
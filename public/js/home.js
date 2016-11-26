/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('hawkui.home', [])
        .controller('HomeCtrl', ['$scope', function ($scope) {
            var vm = [];
            vm.getname = function () {
                // getJson("http://localhost:8088/db/search?name=lake&age=24").then(function (data) {
                //     alert(data.age);
                // });
                var url = 'http://localhost:8088/db/search?name=lake&age=24';
                $http.get(url)
                    .success(function(data){
                        alert(data.age);
                    });
            }

        }]);
});
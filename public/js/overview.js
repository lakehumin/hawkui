/**
 * Created by LakeHm on 2016/11/29.
 */
define(['angular','bmap'], function() {
    angular.module('home.overview', ['angular-baidu-map'])
        .controller('OverViewCtrl', ['$scope','$http', function ($scope,$http) {
            var vm = {};
            $scope.vm = vm;

            $scope.mapReady = function (map) {
                map.enableScrollWheelZoom();
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.MapTypeControl());

                var point = new BMap.Point(116.404, 39.915);
                map.centerAndZoom(point, 15);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            };

        }]);
});
/**
 * Created by LakeHm on 2016/11/23.
 */
define(['angular'], function() {
    angular.module('home.exception', ['home.exception.list'])
        .controller('ExceptionCtrl', ['$scope','$state', function ($scope,$state) {
            var vm = {};
            $scope.vm = vm;

        }])
        .filter('dateFilter', function(){
            var filter = function(date){
                if(date) {
                    return new Date(date).toLocaleDateString();
                } else {
                    return '';
                }
            };
            return filter;
        });
});
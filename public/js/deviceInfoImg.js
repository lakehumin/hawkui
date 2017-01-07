/**
 * Created by LakeHm on 2017/1/7.
 */
define(['angular'], function() {
    angular.module('home.deviceInfo.img', [])
        .controller('DeviceInfoImgCtrl', ['$scope','$http','$stateParams', function ($scope,$http,$stateParams) {
            var vm = {};
            $scope.vm = vm;
            vm.imgHistory=[];
            vm.id = $stateParams.id;

            var date = new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000); //获取近来30天历史数据

            getHistoryImg();

            function getHistoryImg() {
                var url = 'http://'+$scope.ip+':'+$scope.port+'/device/search/historyimg?id='+$stateParams.id
                    +'&date='+date.getTime();
                $http.get(url).success(function(data){
                    if(data.success) {
                        vm.imgHistory = data.data;
                        changeDate();
                    }
                });
            }

            function changeDate() {
                for(var i = 0; i < vm.imgHistory.length; i ++) {
                    vm.imgHistory[i].datetime = new Date(vm.imgHistory[i].date).toLocaleDateString();
                }
            }
        }]);
});
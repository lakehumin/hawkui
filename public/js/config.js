/**
 * Created by LakeHm on 2016/11/4.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        'app': 'app',
        'jquery': 'lib/jquery/jquery',
        'bootstrap': "lib/bootstrap/bootstrap",
        'router': 'lib/angular-ui-router/angular-ui-router',
        'cookies': 'lib/angular-cookies/angular-cookies',
        'angular': 'lib/angular/angular',
        'highcharts': 'lib/highcharts/highcharts',
        'highcharts-more': 'lib/highcharts-more/highcharts-more',
        'solid-gauge': 'lib/solid-gauge/solid-gauge',
        'userManage':'userManage',
        'userOperation':'userOperation',
        'addUser':'addUser',
        'overview':'overview',
        'bmap':'lib/angular-baidu-map.min/angular-baidu-map.min',
        'deviceInfo':'deviceInfo',
        'deviceInfoDetail':'deviceInfoDetail',
        'deviceInfoAdd':'deviceInfoAdd',
        'deviceInfoModify':'deviceInfoModify',
        'deviceInfoImg':'deviceInfoImg',
        'monitor':'monitor',
        'exception':'exception',
        'exceptionList':'exceptionList',
        'exceptionState':'exceptionState',
        'command':'command',
    },
    shim: {
        'angular' : {
            deps: ['jquery'],
            exports : 'angular'
        },
        'router': {
            deps: ['angular']
        },
        'cookies': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'highcharts': {
            deps: ['jquery'],
            exports : 'Highcharts'
        },
        'bmap': {
            deps: ['angular']
        },
        'userManage': {
            deps: ['userOperation','addUser']
        },
        'monitor': {
            deps: ['highcharts-more','solid-gauge']
        },
        'highcharts-more': {
            deps: ['highcharts']
        },
        'solid-gauge': {
            deps: ['highcharts-more','highcharts']
        },
        'overview': {
            deps: ['bmap']
        },
        'deviceInfo': {
            deps: ['deviceInfoDetail','deviceInfoAdd','deviceInfoModify','deviceInfoImg']
        },
        'exception': {
            deps: ['exceptionList']
        },
        'exceptionList': {
            deps: ['exceptionState']
        },
        'app': {
            deps: ['userManage','deviceInfo','overview','monitor','exception','command']
        }
    }
});
// requirejs(['jquery'], function(jquery) {
//
// });
// requirejs(['angular'], function(angular) {
//
// });
// requirejs(['router'], function() {
//
// });
// requirejs(['cookies'], function() {
//
// });
// requirejs(['bootstrap'], function(bootstrap) {
//
// });
// requirejs(['highcharts'], function() {
//
// });
require(['app'], function(app) {

});
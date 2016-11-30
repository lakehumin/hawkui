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
        'userManage':'userManage',
        'userOperation':'userOperation',
        'addUser':'addUser',
        'overview':'overview',
        'bmap':'lib/angular-baidu-map.min/angular-baidu-map.min',
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
        'bmap': {
            deps: ['angular']
        },
        'userManage': {
            deps: ['userOperation','addUser']
        },
        'overview': {
            deps: ['bmap']
        },
        'app': {
            deps: ['userManage','overview']
        }
    }
});
requirejs(['jquery'], function(jquery) {

});
requirejs(['angular'], function(angular) {

});
requirejs(['router'], function() {

});
requirejs(['cookies'], function() {

});
requirejs(['bootstrap'], function(bootstrap) {

});
require(['app'], function(app) {

});
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
        'home':'home',
        'userManage':'userManage',
        'userService':'userService',
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
require(['home'], function() {

});
require(['userManage'], function() {

});
require(['userService'], function() {

});
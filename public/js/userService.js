/**
 * Created by LakeHm on 2016/11/25.
 */
define(['angular'], function() {
    angular.module('hawkui.userService', [])
        .service('userService', function () {
            // this.id = null;
            // this.userId = "222222";
            // this.userRole = null;
            this.create = function (sessionId,userId,userRole) {
                this.id = sessionId;
                this.userId = userId;
                this.userRole = userRole;
            };
            this.destroy = function () {
                this.id = null;
                this.userId = null;
                this.userRole = null;
            };
            return this;
        });
});
/**
 * Created by danielgallegos on 8/17/15.
 */
angular.module('LoginController', ['ngCookies'])
    .controller('LoginController', ['$cookies', function ($cookies) {
        var _this = this;
        this.isSigningUp = false;
        this.signUp = function () {
            _this.isSigningUp = true;
        };

        this.login = function () {
        //    TODO
            _this.user = _this.username;
            $rootScope.session = _this.username
        };

        this.createAccount = function () {
        //  TODO
        };

        this.logout = function () {
            $rootScope.session = null;
            _this.user = null;
            _this.username = '';
            _this.password = '';
            _this.retypePassword = '';
        };
    }]);

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
            $cookies.put('token', _this.username);
        };

        this.createAccount = function () {
        //  TODO
        };

        this.logout = function () {
            $cookies.remove('token');
            _this.user = null;
            _this.username = '';
            _this.password = '';
            _this.retypePassword = '';
        };
    }]);

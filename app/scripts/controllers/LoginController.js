/**
 * Created by danielgallegos on 8/17/15.
 */
angular.module('LoginController', ['RequestService', 'ngCookies'])
    .controller('LoginController', ['RequestService', '$cookies', function (RequestService, $cookies) {
        var _this = this;
        this.isSigningUp = false;
        this.signUp = function () {
            _this.isSigningUp = true;
        };

        this.login = function () {
            var params = {
                username: _this.username,
                password: _this.password
            };
            RequestService
                .login(params)
                .success(function (response) {
                    _this.user = _this.username;
                    $cookies.put('token', response);
                }).error(function(error) {

                });
        };

        this.createUser = function () {
            var params = {
                username: _this.username,
                password: _this.password
            };
            RequestService
                .createUser(params)
                .success(function (response) {
                    _this.user = _this.username;
                    $cookies.put('token', response);
                }).error(function(error) {

                });
        };

        this.logout = function () {
            $cookies.remove('token');
            _this.isSigningUp = false;
            _this.user = null;
            _this.username = '';
            _this.password = '';
            _this.retypePassword = '';
        };
    }]);

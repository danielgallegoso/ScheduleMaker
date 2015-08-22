/**
 * Created by danielgallegos on 8/19/15.
 */
angular.module('RequestService', [])
    .service('RequestService', ['$location', '$http', function ($location, $http) {
        var _this = this;

        this.baseUrl = function() {
            return $location.protocol() + '://' + $location.host() + ':' + $location.port();
        };

        this.login = function (params) {
            return $http.get(_this.baseUrl() + '/v1/users/login', {params: params});
        };

        this.authenticateToken = function (params) {
            return $http.get(_this.baseUrl() + '/v1/users/authenticate', {params: params});
        };

        this.createUser = function (params) {
            return $http.get(_this.baseUrl() + '/v1/users/create', {params: params});
        };

        this.getEmployeeUrl = function (params) {
            return $http.get(_this.baseUrl() + '/v1/users/generate-access', {params: params});
        };

        this.saveShifts = function (params) {
            return $http.post(_this.baseUrl() + '/v1/shifts', params);
        };

        this.getShifts = function (params) {
            return $http.get(_this.baseUrl() + '/v1/shifts', {params: params});
        };

        this.resetShifts = function (params) {
            return $http.delete(_this.baseUrl() + '/v1/shifts', {params: params});
        };

        this.saveEmployeePreferences = function (params) {
            return $http.post(_this.baseUrl() + '/v1/employees', params);
        };

        this.getEmployeePreferences = function (params) {
            return $http.get(_this.baseUrl() + '/v1/employees', {params: params});
        };

        this.resetEmployeePreferences = function (params) {
            return $http.delete(_this.baseUrl() + '/v1/employees', {params: params});
        };
    }]);
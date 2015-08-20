/**
 * Created by danielgallegos on 8/19/15.
 */
angular.module('RequestService', [])
    .service('RequestService', ['$location', '$http', function ($location, $http) {
        this.login = function (params) {
            return $http.get($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/v1/users/login', {params: params});
        };

        this.createUser = function (params) {
            return $http.get($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/v1/users/create', {params: params});
        };
    }]);
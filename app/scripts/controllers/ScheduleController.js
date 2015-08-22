/**
 * Created by danielgallegos on 7/26/15.
 */
angular.module('ScheduleController', ['ScheduleManagementService', 'RequestService', 'ngCookies'])
    .controller('ScheduleController', ['ScheduleManagementService', 'RequestService', '$cookies', function (ScheduleManagementService, RequestService, $cookies) {
        var _this = this;
        this.formShifts = [];
        this.employeePreferences = [];

        this.days = [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ];

        this.addShift = function () {
            _this.formShifts.push({days: {}});
        };

        this.addEmployee = function () {
            var employee = {};
            employee.availability = {};
            _this.days.forEach(function (day) {
                employee.availability[day] = {};
            });
            _this.employeePreferences.push(employee);
        };


        this.submitShiftPreferences = function () {
            _this.formattedShifts = ScheduleManagementService.formatFormShift(_this.formShifts);
        };

        this.submitEmployeePreferences = function () {
            _this.schedule = ScheduleManagementService.submitPreferences(_this.formattedShifts, _this.employeePreferences);
        };

        this.generateLink = function() {
            RequestService
                .getEmployeeUrl({token: $cookies.get('token')})
                .success(function (response) {
                    _this.link = RequestService.baseUrl() + '/employee?accessKey=' + response.accessKey;
                }).error(function (response) {

                });
        };

        // Init

        this.addShift();
        this.addEmployee();
        ScheduleManagementService.initializeShifts(this.days);
        this.formShifts = JSON.parse('[{"days":{"Mon":true},"start":"1970-01-01T09:00:00.000Z","end":"1970-01-01T10:00:00.000Z","targetEmployees":1},{"days":{"Mon":true},"start":"1970-01-01T09:00:00.000Z","end":"1970-01-01T09:30:00.000Z","targetEmployees":2},{"days":{"Mon":true},"start":"1970-01-01T08:00:00.000Z","end":"1970-01-01T08:30:00.000Z","targetEmployees":3},{"days":{"Mon":true},"start":"1970-01-01T10:04:00.000Z","end":"1970-01-01T10:51:00.000Z","targetEmployees":5}]');
    }]);

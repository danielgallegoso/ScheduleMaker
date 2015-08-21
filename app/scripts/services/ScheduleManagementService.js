/**
 * Created by danielgallegos on 7/26/15.
 */
angular.module('ScheduleManagementService', ['EmployeeFactory', 'ShiftFactory'])
    .service('ScheduleManagementService', ['EmployeeFactory', 'ShiftFactory', function (EmployeeFactory, ShiftFactory) {
        var _this = this;
        this.shifts = {};

        this.initializeShifts = function (days) {
            days.forEach(function (day) {
                _this.shifts[day] = [];
            });
        };


        this.getTimeString = function (time) {
            var hours = time.getHours();
            var ampm = 'am';
            if (hours >= 12) {
                ampm = 'pm';
                if (hours > 12) hours -= 12;
            }
            var minutes = time.getMinutes().toString();
            if (minutes.length === 1) minutes = '0' + minutes;
            return '' + hours + ':' + minutes + ' ' + ampm;
        };


        this.formatFormShift = function (formShifts) {
            var result = [];
            formShifts.forEach(function (shift) {
                var formattedShift = {};
                formattedShift.start = new Date(shift.start.valueOf());
                formattedShift.startString = _this.getTimeString(formattedShift.start);
                formattedShift.end = new Date(shift.end.valueOf());
                formattedShift.endString = _this.getTimeString(formattedShift.end);
                formattedShift.targetEmployees = shift.targetEmployees;
                formattedShift.days = JSON.parse(JSON.stringify(shift.days));
                result.push(formattedShift);
            });
            result.sort(_this.compareShifts);
            return result;
        };


        this.submitPreferences = function (formattedShifts, employeePreferences) {
            employeePreferences.forEach(function (employee) {
                employee.employee = new EmployeeFactory(employee.name, employee.targetHours);
            });

            for (var i = 0; i < formattedShifts.length; i++) {
                var shift = formattedShifts[i];
                Object.keys(_this.shifts).forEach(function (day) {
                    if (shift.days[day]) {
                        var newShift = new ShiftFactory(shift.start, shift.end, shift.targetEmployees);
                        employeePreferences.forEach(function (employee) {
                            if (employee.availability[day][i]) newShift.possibleEmployees.push(employee.employee);
                        });
                        _this.shifts[day].push(newShift);
                    } else {
                        _this.shifts[day].push(null);
                    }
                });
            }
            _this.generateSchedule();
            return _this.shifts;
        };


        this.generateSchedule = function() {
            _thi
        };


        this.findConflicts = function () {

        };

        this.findTopShift = function() {

        };

        this.findTopEmployee = function(shift) {

        };


        this.isConflicting = function (arg1, arg2) {
            if (arg1.startTime.getTime() >= arg2.startTime.getTime()) {
                if (arg1.startTime.getTime() >= arg2.endTime.getTime()) {
                    return false;
                }
            } else {
                if (arg1.endTime.getTime() <= arg2.startTime.getTime()) {
                    return false;
                }
            }
            return true;
        };


        this.compareShifts = function (arg1, arg2) {
            var x = arg1.start.getTime() - arg2.start.getTime();
            if (x !== 0) return x;
            return arg1.end.getTime() - arg2.end.getTime();
        };
    }]);
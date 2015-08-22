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
            result.sort(ShiftFactory.compareShifts);
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
            _this.flagConflicts();
            return _this.generateSchedule();
        };


        this.generateSchedule = function () {
            while (true) {
                var topShift = this.findTopShift();
                if (!topShift) return _this.shifts;
                var topEmployee = this.findTopEmployee(topShift);
                if (!topEmployee) return null;
                topShift.assignEmployee(topEmployee);
                topEmployee.assignShift(topShift);
                topShift.conflicts.forEach(function (shift) {
                    shift.removePossibleEmployee(topEmployee);
                });
            }
        };


        this.flagConflicts = function () {
            Object.keys(_this.shifts).forEach(function (day) {
                var shifts = _this.shifts[day];
                for (var i = 0; i < shifts.length; i++) {
                    for (var j = i + 1; j < shifts.length; j++) {
                        if (shifts[i] && shifts[j] && ShiftFactory.isConflicting(shifts[i], shifts[j])) {
                            shifts[i].addConflict(shifts[j]);
                            shifts[j].addConflict(shifts[i]);
                        }
                    }
                }
            });
        };

        this.findTopShift = function () {
            var preference = 0;
            var topShift = null;
            Object.keys(_this.shifts).forEach(function (day) {
                _this.shifts[day].forEach(function (shift) {
                    if (shift) {
                        if (shift.priority() > preference) {
                            preference = shift.priority();
                            topShift = shift;
                        }
                    }
                });
            });
            return topShift;
        };

        this.findTopEmployee = function (shift) {
            var preference = 0;
            var topEmployee = null;
            shift.possibleEmployees.forEach(function (employee) {
                if (employee.priority() > preference) {
                    preference = employee.priority();
                    topEmployee = employee;
                }
            });
            return topEmployee;
        };
    }]);
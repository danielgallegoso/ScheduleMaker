/**
 * Created by danielgallegos on 7/29/15.
 */
angular.module('ShiftFactory', [])
    .factory('ShiftFactory', [function () {
        function Shift(startTime, endTime, targetEmployees) {
            this.startTime = startTime;
            this.endTime = endTime;
            this.targetEmployees = targetEmployees;
            this.possibleEmployees = [];
            this.employees = [];
            this.conflicts = [];

            Shift.prototype.assignEmployee = function (employee) {
                this.employees.push(employee);
                this.removePossibleEmployee(employee);
            };

            Shift.prototype.removePossibleEmployee = function(employee) {
                var index = this.possibleEmployees.indexOf(employee);
                if (index === -1) return;
                this.possibleEmployees.splice(index, 1);
            };

            Shift.prototype.priority = function () {
                return (this.targetEmployees - this.employees.length) / (this.possibleEmployees.length + 1)
            };

            Shift.prototype.addConflict = function (shift) {
                this.conflicts.push(shift);
            };

            Shift.prototype.getHours = function () {
                return this.endTime.getHours() - this.startTime.getHours()
                    + (this.endTime.getMinutes() - this.startTime.getMinutes()) / 60;
            };

            Shift.isConflicting = function (arg1, arg2) {
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


            Shift.compareShifts = function (arg1, arg2) {
                var x = arg1.start.getTime() - arg2.start.getTime();
                if (x !== 0) return x;
                return arg1.end.getTime() - arg2.end.getTime();
            };
        }

        return Shift;
    }]);
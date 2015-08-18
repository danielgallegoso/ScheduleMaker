/**
 * Created by danielgallegos on 7/29/15.
 */
angular.module('ShiftFactory', [])
    .factory('ShiftFactory', [function () {
        function Shift(startTime, endTime, targetEmployees) {
            var _this = this;
            this.startTime = startTime;
            this.endTime = endTime;
            this.targetEmployees = targetEmployees;
            this.possibleEmployees = [];
            this.employees = [];
            this.conflicts = [];

            Shift.prototype.addEmployee = function (employee) {
                _this.employees.push(employee);
            };

            Shift.prototype.priority = function () {
                return (_this.targetEmployees - _this.employees.length) / (_this.possibleEmployees.length + 1)
            };

            Shift.prototype.addConflict = function (shift) {
                _this.conflicts.push(shift);
            };

            Shift.prototype.getHours = function () {
                return _this.endTime.getHours() - _this.startTime.getHours()
                    + (_this.endTime.getMinutes() - _this.startTime.getMinutes()) / 60;
            };
        }

        return Shift;
    }]);
/**
 * Created by danielgallegos on 7/29/15.
 */
angular.module('EmployeeFactory', [])
    .factory('EmployeeFactory', [function () {
        function Employee(name, targetHours) {
            this.name = name;
            this.targetHours = targetHours;
            this.hours = 0;

            Employee.prototype.priority = function () {
                return this.targetHours / (this.hours + 1);
            };

            Employee.prototype.assignShift = function (shift) {
                this.hours += shift.getHours();
            };
        }

        return Employee;
    }]);
/**
 * Created by danielgallegos on 7/29/15.
 */
angular.module('EmployeeFactory', [])
    .factory('EmployeeFactory', [function () {
        function Employee(name, targetHours) {
            var _this = this;

            this.name = name;
            this.targetHours = targetHours;
            this.hours = 0;

            Employee.prototype.getPriority = function () {
                return _this.targetHours / (_this.hours + 1);
            };
        }

        return Employee;
    }]);
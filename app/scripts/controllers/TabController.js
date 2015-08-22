/**
 * Created by danielgallegos on 7/25/15.
 */
angular.module('TabController', [])
    .controller('TabController', [function () {

        var _this = this;

        this.tabs = [
            {
                title: 'Specify Shifts',
                url: 'views/main/shifts.html'
            },
            {
                title: 'Employee Preferences',
                url: 'views/main/employee.html'
            },
            {
                title: 'Generate Schedule',
                url: 'views/main/schedule.html'
            }
        ];

        this.currentTab = this.tabs[0].url;

        this.clickTab = function (tab) {
            _this.currentTab = tab.url;
        };

        this.isActive = function (tab) {
            return tab.url == _this.currentTab;
        }
    }]);
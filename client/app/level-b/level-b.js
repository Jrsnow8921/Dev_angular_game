goog.provide('app.levelb');

goog.require('app.levelb.LevelBController');


/**
 * Module definition for the levelb module
 * Covers the display of level B
 * @type {!angular.Module}
 */
app.levelb.module = angular.module(
    'app.levelb', []);

app.levelb.module.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/level-b', {
        templateUrl: 'views/level-b/level-b.html',
        controller: app.levelb.LevelBController,
        controllerAs: 'levelbCtrl'
      });
}]);

app.levelb.module.controller('levelbCtrl', app.levelb.LevelBController);

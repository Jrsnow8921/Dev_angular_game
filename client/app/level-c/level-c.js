goog.provide('app.levelc');

goog.require('app.levelc.LevelCController');


/**
 * Module definition for the levelc module
 * Covers the display of level C
 * @type {!angular.Module}
 */
app.levelc.module = angular.module(
    'app.levelc', []);

app.levelc.module.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/level-c', {
        templateUrl: 'views/level-c/level-c.html',
        controller: app.levelc.LevelCController,
        controllerAs: 'levelcCtrl'
      });
}]);

app.levelc.module.controller('levelcCtrl', app.levelc.LevelCController);

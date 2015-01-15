goog.provide('app.levela');

goog.require('app.levela.LevelAController');
goog.require('app.levela.LevelAService');


/**
 * Module definition for the levela module
 * Covers the display of level A
 * @type {!angular.Module}
 */
app.levela.module = angular.module(
    'app.levela', []);

app.levela.module.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/level-a', {
        templateUrl: 'views/level-a/level-a.html',
        controller: app.levela.LevelAController,
        controllerAs: 'levelaCtrl'
      });
}]);

app.levela.module.controller('levelaCtrl', app.levela.LevelAController);

app.levela.module.service('levelAService', app.levela.LevelAService);

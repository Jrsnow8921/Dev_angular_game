goog.provide('app');

goog.require('app.AppController');
goog.require('app.AppService');
goog.require('app.constants');
goog.require('app.levela');
goog.require('app.levelb');
goog.require('app.levelc');
goog.require('goog.string');


/**
 * Module definition for the app module
 * Entry level module for app definition
 * @type {!angular.Module}
 */
app.module = angular.module(
    'gm',
    ['ngRoute',
     'ngTouch',
     app.levela.module.name,
     app.levelb.module.name,
     app.levelc.module.name
    ]);


app.module.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .otherwise({redirectTo: '/level-a'});
}]);

app.module.controller('appController', app.AppController);

app.module.service('appService', app.AppService);

app.module.filter('unsafeResource', ['$sce', function($sce) {
  return function(val) {
    return $sce.trustAsResourceUrl(val);
  };
}]);

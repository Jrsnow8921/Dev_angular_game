'use strict';var c = this;
function f(a, g) {
  var d = a.split("."), b = c;
  d[0] in b || !b.execScript || b.execScript("var " + d[0]);
  for (var e;d.length && (e = d.shift());) {
    d.length || void 0 === g ? b = b[e] ? b[e] : b[e] = {} : b[e] = g;
  }
}
;function h() {
}
f("app.AppController", h);
function k() {
  this.size = 3;
}
f("app.AppService", k);
function l() {
}
f("app.levela.LevelAController", l);
l.prototype = {};
l.prototype.selectPathway = function() {
};
function m() {
}
f("app.levela.LevelAService", m);
m.prototype = {};
var n = angular.module("app.levela", []);
n.config(["$routeProvider", function(a) {
  a.when("/level-a", {templateUrl:"views/level-a/level-a.html", controller:l, controllerAs:"levelaCtrl"});
}]);
n.controller("levelaCtrl", l);
n.service("levelAService", m);
function p() {
}
f("app.levelb.LevelBController", p);
p.prototype = {};
var q = angular.module("app.levelb", []);
q.config(["$routeProvider", function(a) {
  a.when("/level-b", {templateUrl:"views/level-b/level-b.html", controller:p, controllerAs:"levelbCtrl"});
}]);
q.controller("levelbCtrl", p);
function r() {
}
f("app.levelc.LevelCController", r);
r.prototype = {};
var s = angular.module("app.levelc", []);
s.config(["$routeProvider", function(a) {
  a.when("/level-c", {templateUrl:"views/level-c/level-c.html", controller:r, controllerAs:"levelcCtrl"});
}]);
s.controller("levelcCtrl", r);
var t = angular.module("gm", ["ngRoute", "ngTouch", n.name, q.name, s.name]);
t.config(["$routeProvider", function(a) {
  a.otherwise({redirectTo:"/level-a"});
}]);
t.controller("appController", h);
t.service("appService", k);
t.filter("unsafeResource", ["$sce", function(a) {
  return function(g) {
    return a.trustAsResourceUrl(g);
  };
}]);


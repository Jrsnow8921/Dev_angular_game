goog.provide('app.AppService');

goog.require('app.constants');

/**
 * [app.AppService description]
 * @constructor
 * @export
 * @ngInject
 */
app.AppService = function() {
  /**
   * [size description]
   * @type {number}
   */
  this.size = app.constants.sizeUnset;
};

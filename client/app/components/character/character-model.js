goog.provide('app.character.CharacterModel');


/**
* [app.character.CharacterModel description]
* @constructor
*/
app.character.CharacterModel = function() {

  /**
   * @type {?string}
   * @expose
   */
  this.id = null;

  /**
   * @type {?string}
   * @expose
   */
  this.firstName = null;

  /**
   * @type {?string}
   * @expose
   */
  this.lastName = null;

  /**
   * @type {?string}
   * @expose
   */
  this.race = null;

  /**
   * @type {?string}
   * @expose
   */
  this.sex = null;

  /**
   * @type {?string}
   * @expose
   */
  this.partyId = null;
};

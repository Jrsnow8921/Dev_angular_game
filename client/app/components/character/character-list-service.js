goog.provide('app.character.CharacterListService');


goog.require('app.character.CharacterModel');



/**
 * @constructor
 * @export
 */
app.character.CharacterListService = function() {

  /**
   * [characters_ description]
   * @type {!Array.<app.character.CharacterModel>}
   */
  this.characters = [];

};
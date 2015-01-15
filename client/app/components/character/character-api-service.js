goog.provide('app.character.CharacterApiService');


goog.require('app.character.CharacterModel');



/**
 * @constructor
 * @param {!angular.$http} $http
 * @ngInject
 * @export
 */
app.character.CharacterApiService = function($http) {

  /**
   * [$http_ description]
   * @type {!angular.$http}
   * @private
   */
  this.$http_ = $http;

};

app.character.CharacterApiService.prototype = {

  /**
   * Makes an API call to character index action.
   * Gets all characters.
   * @param {string} id
   * @return {!angular.$http.HttpPromise}
   */
  getCharacterList: function(id) {
    return this.$http_.get('/characters');
  },

  /**
   * Makes an API call to character show action.
   * Gets a single character by ID.
   * @param {string} id
   * @return {!angular.$http.HttpPromise}
   */
  getCharacter: function(id) {
    return this.$http_.get('/characters/' + id);
  },

  /**
   * Makes API call to character create action.
   * Saves a single character
   * @param {app.character.CharacterModel} character
   * @return {!angular.$http.HttpPromise}
   */
  createCharacter: function(character) {
    return this.$http_.post('/characters', { 'character': character });
  },

  /**
   * Makes API call to character update action.
   * Saves a single character
   * @param {app.character.CharacterModel} character
   * @return {!angular.$http.HttpPromise}
   */
  updateCharacter: function(character) {
    return this.$http_.put('/characters',
      {
        'id': character.id,
        'character': character
      });
  },

  /**
   * Makes API call to character destroy action.
   * Deletes a single character
   * @param {app.character.CharacterModel} character
   * @return {!angular.$http.HttpPromise}
   */
  deleteCharacter: function(character) {
    return this.$http_.delete('/characters', { 'id': character.id });
  }

};

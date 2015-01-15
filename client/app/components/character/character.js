goog.provide('app.character');

goog.require('app.character.CharacterApiService');
goog.require('app.character.CharacterListService');


/**
 * Module definition for the character module
 * @type {!angular.Module}
 */
app.character.module = angular.module('app.character', []);

app.character.module.service('characterListService',
    app.character.CharacterService);

app.character.module.service('characterApiService',
    app.character.CharacterApiService);

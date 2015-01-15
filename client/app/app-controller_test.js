goog.require('app.AppController');


describe('UT: app.AppController', function() {
  var uut;

  beforeEach(function() {
    uut = new app.AppController();
  });

  describe('FUNCTION: constructor', function() {
    it('should initialise the controller', function() {
      expect(uut).toBeDefined();
    });
  });
});

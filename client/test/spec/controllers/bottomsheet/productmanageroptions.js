'use strict';

describe('Controller: BottomsheetProductmanageroptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var BottomsheetProductmanageroptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BottomsheetProductmanageroptionsCtrl = $controller('BottomsheetProductmanageroptionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BottomsheetProductmanageroptionsCtrl.awesomeThings.length).toBe(3);
  });
});

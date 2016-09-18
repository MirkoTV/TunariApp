'use strict';

describe('Controller: ProductmanageroptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProductmanageroptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductmanageroptionsCtrl = $controller('ProductmanageroptionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductmanageroptionsCtrl.awesomeThings.length).toBe(3);
  });
});

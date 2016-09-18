'use strict';

describe('Controller: ProductmanagerCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProductmanagerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductmanagerCtrl = $controller('ProductmanagerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductmanagerCtrl.awesomeThings.length).toBe(3);
  });
});

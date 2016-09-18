'use strict';

describe('Controller: ModalProductdetailsmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ModalProductdetailsmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalProductdetailsmodalCtrl = $controller('ModalProductdetailsmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModalProductdetailsmodalCtrl.awesomeThings.length).toBe(3);
  });
});

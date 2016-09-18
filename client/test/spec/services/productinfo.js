'use strict';

describe('Service: productInfo', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var productInfo;
  beforeEach(inject(function (_productInfo_) {
    productInfo = _productInfo_;
  }));

  it('should do something', function () {
    expect(!!productInfo).toBe(true);
  });

});

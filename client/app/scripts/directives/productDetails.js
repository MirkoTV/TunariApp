'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:productDetails
 * @description
 * # productDetails
 */
angular.module('tunariApp')
  .directive('productDetails', function () {
    return {
      templateUrl: '../../views/productDetails.html',
      controller: 'ProductDetailsCtrl',
      scope: {
          selectedProduct : '=',
          serverConfig : '=',
          deleteSelectedProduct : '&',
          saveSelectedProduct : '&'
      }, 
      restrict: 'E'
    };
  });

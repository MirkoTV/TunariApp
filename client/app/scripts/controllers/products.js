'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductsCtrl', ['$scope', 'Products', 'ProductInfo',
        function ($scope, Products, ProductInfo) {

    Products.getList({}).then(function(products) {
        $scope.products = products;
        $scope.product = products[0];
        console.log($scope.product.name);
    });

    $scope.getProductImageUrl = function(product, sufix) {
        return  ProductInfo.getProductImageUrl(product, sufix);
    }

  }]);

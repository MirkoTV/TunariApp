'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductsCtrl', ['$scope', '$location', '$mdDialog', '$mdMedia', 'Products', 'ProductInfo',
        function ($scope, $location, $mdDialog, $mdMedia, Products, ProductInfo) {

    Products.getList({}).then(function(products) {
        $scope.products = products;
    });

    $scope.getProductImageUrl = function(product, sufix) {
        return  ProductInfo.getProductImageUrl(product, sufix);
    }

    $scope.editProduct = function(productId){
        $location.path ("products/" + productId);
    }

    $scope.$on('onBottomFabRightButtonClicked', function(event, args) {
        var useFullScreen = ($mdMedia('xs'));

        $mdDialog.show({
            controller: 'NewProductCtrl',
            templateUrl: '../../views/modal/newProduct.html',
            parent: angular.element(document.body),
            targetEvent: args.ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        }).then(function(product) {
            $scope.products.splice(0, 0, product);
        });
    });

    $('.grid').masonry({
        // options
        itemSelector: 'md-card',
        columnWidth: 50
    });
  }]);

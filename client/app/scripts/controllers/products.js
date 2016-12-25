'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductsCtrl', ['$scope', '$location', '$mdDialog', '$mdMedia', 'Restangular', 'Config', 'Messages', 'Products', 'ProductInfo',
        function ($scope, $location, $mdDialog, $mdMedia, Restangular, Config, Messages, Products, ProductInfo) {
    
    $scope.tags =[];
    var useFullScreenForModals = ($mdMedia('xs'));

    Products.getList({}).then(function(products) {
        $scope.products = products;
    });

    $scope.getProductImageUrl = function(product, sufix) {
        return  ProductInfo.getProductImageUrl(product, sufix);       
    }

    $scope.getProductPrice = function(product) {
        return _.find(product.prices, {type: 'Paquete'});     
    }

    $scope.editProduct = function(productId){
        $location.path ("products/" + productId);
    }

   /* $scope.$on('onBottomFabRightButtonClicked', function(event, args) {
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
    });*/

    $scope.openCreateProductModal = function(event){    
        var newProduct = Restangular.one('products');

        $mdDialog.show({
            controller: 'NewProductCtrl',
            templateUrl: '../../views/modal/newProduct.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: useFullScreenForModals,
            locals : {
                product : newProduct
            }
        }).then(function() {            
            newProduct.save().then(function(productCreated){            
                $scope.products.splice(0, 0, productCreated);
                $scope.showToast(Messages.message002, productCreated.name);
            }, function(response){            
                manageCreateProductError(response);
            });
        }, function() {});
    }

    function manageCreateProductError(response) {
        if(response.code = 409) {    
            console.log(_.template(Messages.message018)({product : $scope.product.name}));                
        }
        else {                
            console.log(Messages.message019);
        }
    }

    $scope.openEditProductModal = function(event, product) {
        var productToEdit = Restangular.copy(product);

        $mdDialog.show({
            controller: 'NewProductCtrl',
            templateUrl: '../../views/modal/newProduct.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: useFullScreenForModals,
            locals : {
                product : productToEdit
            }
        }).then(function() {
            productToEdit.put().then(function(productEdited) {
                var productIndex = _.indexOf($scope.products, product);
                $scope.products.splice(productIndex, 1, productEdited)
                $scope.showToast(Messages.message004, productEdited.name);
            });                        
        }, function() {});
    }

    $scope.deleteProduct = function(event, product) {
        var deleteProductModal = $mdDialog.confirm()
          .title('Esta seguro de borrar este producto?')
          .textContent('El producto seleccionado se borrara')
          .ariaLabel('Delete product')
          .targetEvent(event)
          .ok('Borralo!')
          .cancel('Cancelar');

        $mdDialog.show(deleteProductModal).then(function(){
            product.remove().then(function(){
                _.pull($scope.products, product);
                $scope.showToast(Messages.message006, product.name);
            });
        });
    }
  }]);

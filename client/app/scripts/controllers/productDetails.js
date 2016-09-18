'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductdetailsCtrl
 * @description
 * # ProductdetailsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductDetailsCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', '$mdMedia', 'ServerData', 'ProductInfo', 
  	function ($scope, $mdBottomSheet, $mdDialog, $mdMedia, ServerData, ProductInfo) {
    	$scope.isSmallScreen = ($mdMedia('sm') || $mdMedia('xs'));
    	//$scope.selectedProduct = selectedProduct;

    	/*ServerData.config.get().then(function(config){
	        $scope.config = config;
	        $scope.categories = _.pluck(config.productCategories, 'name');	         
	    });*/

    	$scope.priceOptions = {
		    types: ['Paquete', 'Unidad'],
		    descriptions: ['Regular', 'Especial']
		}; 

		$scope.locationOptions = {
		    types: ['Tienda', 'Deposito']        
		};

		$scope.newPrice = {
		    type: $scope.priceOptions.types[0],
		    description: $scope.priceOptions.descriptions[0]
		};

		$scope.newLocation = {
		    type: $scope.locationOptions.types[0]
		};

    	$scope.getProductImageUrl = function(product, sufix) {    		
	        return  ProductInfo.getProductImageUrl(product, sufix);
	    }

	    $scope.addNewPrice = function() {
	        $scope.selectedProduct.prices.push(_.clone($scope.newPrice));
	    }

	    $scope.removePrice = function(price) {
	        _.pull($scope.selectedProduct.prices, price);    
	    }

	    $scope.addNewLocation = function() {
	        $scope.selectedProduct.locations.push(_.clone($scope.newLocation));
	    }

	    $scope.removeLocation = function(price) {
	        _.pull($scope.selectedProduct.locations, location);    
	    }

//	    $scope.updateTagsWithCategory = function() {
//	        $scope.selectedProduct.tags = _.difference($scope.selectedProduct.tags, $scope.serverConfig.productCategories);
//	        $scope.selectedProduct.tags.push($scope.selectedProduct.category);
//	    }

        $scope.changeCategory = function() {
            setProductView();
            $scope.$broadcast ('updateProperties');
        }

	    $scope.$watch('selectedProduct', function() {
    		$scope.categories = _.pluck($scope.serverConfig.productCategories, 'name');
            setProductView();
            $scope.$broadcast ('updateProperties');
        });

        function setProductView() {
            var categoryConfig = _.where($scope.serverConfig.productCategories, {name: $scope.selectedProduct.category})[0] || {};
            $scope.specificProductView = categoryConfig.view;
        }
  }]);

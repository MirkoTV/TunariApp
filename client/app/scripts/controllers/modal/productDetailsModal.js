'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ModalProductdetailsmodalCtrl
 * @description
 * # ModalProductdetailsmodalCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductDetailsModalCtrl', ['$scope', '$mdDialog', 'selectedProduct', 'config', 
  	function ($scope, $mdDialog, selectedProduct, config) {
    $scope.selectedProduct = selectedProduct;
    $scope.config = config;

    $scope.cancel = function () {
	  	$mdDialog.cancel();
	};  
  }]);

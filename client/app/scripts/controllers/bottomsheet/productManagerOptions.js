'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BottomsheetProductmanageroptionsCtrl
 * @description
 * # BottomsheetProductmanageroptionsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductManagerOptionsCtrl', ['$scope', '$mdBottomSheet', function ($scope, $mdBottomSheet) {
    $scope.items = [
    	 {
      	 	name : "DeleteSelectedProducts",
      	 	text : "Eliminar los productos seleccionados",
      	 	icon : "delete"
    	 }
    ]

    $scope.listItemClick = function($index) {
  	    var clickedItem = $scope.items[$index];
  	    $mdBottomSheet.hide(clickedItem);
  	};
  }]);

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewProductCtrl
 * @description
 * # NewProductCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('NewProductCtrl', 
              ['$scope', '$location', '$mdDialog', 'Restangular', 'Settings', 'ServerData', 'Products', 'Notifier', 'Messages', 'product',
             function ($scope, $location, $mdDialog, Restangular, Settings, ServerData, Products, Notifier, Messages, product) {

    $scope.serverData = ServerData;
    $scope.productNames = [];
    $scope.newPrice = {};
    $scope.newLocation = {};
    $scope.product = product;
    /*ServerData.config.get().then(function(config){
        $scope.config = config;
        $scope.categories = _.pluck(config.productCategories, 'name');
        $scope.product.category = $scope.categories[0];
        $scope.updateCategory();
    });*/

    Settings.getList().then(function(settings){
        $scope.categories = _.find(settings, {'key': 'productCategories'}).value;
        
        $scope.priceTypes = _.find(settings, {'key': 'priceTypes'}).value;
        $scope.newPrice.type = _.find($scope.priceTypes, function(price) {return _.includes(price, 'Unidad')});
        $scope.newPrice.quantity = 1;

        $scope.locationTypes = _.find(settings, {key: 'locationTypes'}).value;
        $scope.newLocation.type = $scope.locationTypes[0];

        $scope.invitationTypes = _.find(settings, {'key': 'invitationTypes'}).value;
        setDefaultValues();
    });

    function setDefaultValues() {
        $scope.product.category = $scope.product.category ? 
                                    $scope.product.category : $scope.categories[0].name;
        $scope.product.tags = $scope.product.tags ? 
                                    $scope.product.tags : [];
    }

    $scope.updateCategory = function () {
        var category = $scope.product.category;
        $scope.product = {category: category,prices:[],properties:{},tags:[],locations:[]};
        $scope.productView = _.where($scope.config.productCategories, {name:category})[0].view;

        // Merge default product properties with specif default product properties based 
        // on the product category.
        $scope.defaultValues = $.extend(true, {}, $scope.config.defaultProductProperties['Default']);  
        _.merge($scope.defaultValues, $scope.config.defaultProductProperties[category] || {}, 
            // Replace first array with second array when merging
            // Default behavior would mix the arrays, that is not what we want
            function(a, b) {
                if (_.isArray(a)) {
                    return b;
                };
            }
        );   
    }        

    var prepareProductBeforeSaving = function() {                
        // Default value for sortTag, this can be overriden in prepareSpecificPropertiesBeforeProductSaving 
        $scope.product.sortTag = $scope.product.category + $scope.product.name;
        $scope.product.name = _.upperCase($scope.product.name);
        
        //$scope.product.tags.push($scope.product.name);       
        //$scope.product.tags.push($scope.product.category);       
        //$scope.product.tags.push($scope.product.provider); 

        //$scope.$broadcast ('prepareSpecificPropertiesBeforeProductSaving');
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
    }

    $scope.save = function() {
        prepareProductBeforeSaving();
        $mdDialog.hide();
    }   

    $scope.selectPriceType = function() {
        if(_.includes($scope.newPrice.type, 'Paquete')) {
            $scope.isNewPriceQuantityShowed = true;
            $scope.newPrice.quantity = 100;
        } else if($scope.newPrice.type === 'Otro') {
            $scope.isPriceTypeInputShowed = true;
            $scope.isNewPriceQuantityShowed = true;
            $scope.newPrice.quantity = 100;
        } else {
            $scope.isNewPriceQuantityShowed = false;
            $scope.newPrice.quantity = 1;
        }        
    }


    $scope.addPrice = function() {
        $scope.isPriceTypeInputShowed = false;
        $scope.product.prices.splice(0, 0, $scope.newPrice);
        $scope.newPrice = {}
    }

    $scope.removePrice = function(price) {
        _.pull($scope.product.prices, price);
    }

    $scope.addLocation = function() {        
        $scope.product.locations.splice(0, 0, $scope.newLocation);
        $scope.newLocation = {}
    }

    $scope.removeLocation = function(location) {
        _.pull($scope.product.locations, location);
    }

    $('#name').focus();
  }]);

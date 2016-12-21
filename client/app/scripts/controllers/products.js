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
    
    $scope.tags =[];

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

   /* $('.grid').masonry({
        // options
        itemSelector: ['md-card', '.card'],
        columnWidth: 'md-card',
        percentPosition: true
    });*/

   /* var $grid = $('.grid').imagesLoaded( function() {
        console.log("done");
        // init Masonry after all images have loaded
        $grid.masonry({
            // options
            itemSelector: ['md-card', '.card'],
            columnWidth: 'md-card',
            percentPosition: true
        });
    });*/

    $scope.images = [
        "http://farm6.static.flickr.com/5065/5652087521_91498536d1_z.jpg",
        "http://g02.a.alicdn.com/kf/HTB1ctgiIFXXXXcYXXXXq6xXFXXXh/-Brand-New-Original-Super-Quality-with-box-packing-Pilot-bp-s-multicolour-ballpoint-pen-bp.jpg",
        "http://www.multipapel.com/sad/upload/descriptores/18058/FRIXION%20CLICKER_original.gif",        
        "http://www.mundopilot.com/wp-content/uploads/2015/04/Lapiceros.png",
        "http://www.mundopilot.com/wp-content/uploads/2015/08/Pantalla_afiche-Pilot-2015.jpg"
    ];
    angular.element(document).ready(function () {
         // init Masonry
        var $grid = $('.grid').masonry({
            // options
            itemSelector: ['md-card', '.card'],
            columnWidth: 'md-card',
            percentPosition: true
        });

        // layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {
            $grid.masonry('layout');
        });
    });
   
  }]);

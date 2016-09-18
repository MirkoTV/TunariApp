'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductmanagerCtrl
 * @description
 * # ProductmanagerCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('ProductManagerCtrl', ['$scope', '$mdMedia', '$mdDialog', '$mdBottomSheet', 'ServerData', 'Products', 'SearchInfo', 'ProductInfo', 
  	function ($scope, $mdMedia, $mdDialog, $mdBottomSheet, ServerData, Products, SearchInfo, ProductInfo) {

    $scope.isSmallScreen = ($mdMedia('sm') || $mdMedia('xs'));
  	$scope.pagination = {
        current: 0,
        itemsPerPage: 30
    };
    $scope.products = [];
    
    $scope.selectedProduct = {
        category: "",
        properties:{},
        tags: []
    };
    $scope.config = {};

    ServerData.config.get().then(function(config){
        $scope.config = config;       
    });

    $scope.tags = SearchInfo.getTags();
    
  	$scope.search = function(restart) {
        $scope.isLoading = true;
        $scope.products = restart ? [] : $scope.products; 


        $scope.pagination.current = restart 
            ? 1
            : $scope.pagination.current + 1;
        var query = $scope.tags ? {tags: $scope.tags} : {};
        query.page = $scope.pagination.current;
        query.queryLimit = $scope.pagination.itemsPerPage;

        Products.getList(query).then(function(products) {
            $scope.products = $scope.products.concat(products);
            $scope.totalProducts = products.meta.count;    
            SearchInfo.setTags($scope.tags);
            selectProduct(products[0]);            
            $scope.isLoading = false;
        });
    }

    $scope.getProductImageUrl = function(product, sufix) {
        return  ProductInfo.getProductImageUrl(product, sufix);
    }    

    $scope.selectProduct = function(product, ev) {               
        selectProduct(product);

        ev.stopPropagation();

        if($scope.isSmallScreen) {            
            $mdDialog.show({
              controller: 'ProductDetailsModalCtrl',
              templateUrl: '../../views/modal/productDetails.html',
              locals: {
                selectedProduct: $scope.selectedProduct,
                config: $scope.config
              },
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: true
            });
        }         
    }

    function selectProduct(product) {
        $scope.backupSelectedProduct = product;
        $scope.selectedProduct = _.cloneDeep($scope.backupSelectedProduct);
        $scope.selectedProduct.tags = _.uniq(product.tags) 
//        $scope.$broadcast ('selectProduct');
    }

    $scope.$on('onBottomFabRightButtonClicked', function(event, args) {    
   
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        
        $mdDialog.show({
              controller: 'NewProductCtrl',
              templateUrl: '../../views/modal/newProduct.html',
              parent: angular.element(document.body),
              targetEvent: args.ev,
              clickOutsideToClose:true,
              fullscreen: false
        }).then(function(product) {
            selectProduct(product);
            $scope.products.splice(0, 0, product);            
        });
    });

    $scope.$on('onBottomFabLeftButtonClicked', function (ev, obj) {
        $mdBottomSheet.show({
          templateUrl: '../../views/bottomSheet/productManagerOptions.html',
          controller: 'ProductManagerOptionsCtrl'
        }).then(function(clickedItem) {
            if(clickedItem.name === "DeleteSelectedProducts") {
                deleteSelectedProducts();
            }            
        });
    });
    

    function deleteSelectedProducts ()
    {
        var selectedProducts = _.filter($scope.products, function(product){
            return product.selected === true;
        });

        var confirmDelete = $mdDialog.confirm()
          .title('Esta seguro de eliminar los productos seleccionados?')
          .textContent(selectedProducts.length + ' productos seran borrados.')
          .ariaLabel('Delete Products')          
          .ok('Borralos!')
          .cancel('Cancel');
        $mdDialog.show(confirmDelete).then(function() {
            selectedProducts.forEach(function(product){
                deleteProduct(product);
            });
        });
    }

    $scope.deleteSelectedProduct = function() {

        var confirmDelete = $mdDialog.confirm()
          .title('Esta seguro de eliminar El producto' + $scope.selectedProduct.name + '?')
          .textContent('1 producto sera borrado.')
          .ariaLabel('Delete Products')          
          .ok('Borralo!')
          .cancel('Cancel');
        $mdDialog.show(confirmDelete).then(function() {
            deleteProduct($scope.selectedProduct);
        });
    }

    function deleteProduct(product) {

        Products.one(product._id).remove().then(function(){             
            _.pull($scope.products, $scope.backupSelectedProduct);
            if($scope.backupSelectedProduct._id === product._id) {
               selectProduct($scope.products[0]);
            }
        });                    
    };

    $scope.queryProductSearchNames = function(query) {        
        return SearchInfo.getProductNames(query);
    };

    $scope.setTags = function(text) {
        $scope.tags = text;
    }    

    $scope.saveSelectedProduct = function(){
        console.log("hello!");
        prepareProductBeforeSaving();
        
        $scope.backupSelectedProduct.put().then(function(){
//            Notifier({
//                message: Messages.message004 + $scope.selectedProduct.name,
//                classes: 'alert-info'
//            });
            console.log("salvado!");
        }, function(response){
            if(response.code = 409) {                
                Notifier({ 
                    message: _.template(Messages.message018)({product : $scope.product.name}),
                    classes: 'alert-danger'
                });
            }
            else {                
                Notifier({ 
                    message: Messages.message019,
                    classes: 'alert-danger'
                });
            }
        });        
    }

    function prepareProductBeforeSaving(){
        // Default value for sortTag, this can be overridden in prepareSpecificPropertiesBeforeProductSaving

        $scope.products[_.indexOf($scope.products, $scope.backupSelectedProduct)] = $scope.selectedProduct;
        $scope.selectedProduct.sortTag = $scope.selectedProduct.category + $scope.selectedProduct.name;
        
        $scope.selectedProduct.tags = _.difference($scope.selectedProduct.tags, getTagsToRemoveWhenUpdating());
        $scope.selectedProduct.tags.push($scope.selectedProduct.name);
        console.log($scope.selectedProduct.provider);
        $scope.selectedProduct.tags.push($scope.selectedProduct.provider);

        $scope.backupSelectedProduct.provider = $scope.selectedProduct.provider;
        //$scope.$broadcast ('prepareSpecificPropertiesBeforeProductSaving');   
    }

    function getTagsToRemoveWhenUpdating(){
        var tags = [$scope.backupSelectedProduct.name, $scope.backupSelectedProduct.provider];
        return tags;
    }

    $scope.search(true);  

  }]);

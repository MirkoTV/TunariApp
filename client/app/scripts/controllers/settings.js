'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StatisticsCtrl
 * @description
 * # StatisticsCtrl
 * Controller of the clientApp
 */
angular.module('tunariApp')
  .controller('SettingsCtrl', ['$scope', '$location', 'Settings', 'ProductInfo',
        function ($scope, $location, Settings, ProductInfo) {

    $scope.layout.title = 'Configuraciones';

    Settings.getList().then(function(settings){
          $scope.imgServer = _.find(settings, {'key': 'imgServer'});    
          $scope.quickSearchs = _.find(settings, {'key': 'quickSearchs'});
          console.log($scope.quickSearchs);

          if(!$scope.imgServer) {
            Settings.post({key:"imgServer", value:""}).then(function(newSetting){
              $scope.imgServer = newSetting;
            });
          }

          if(!$scope.quickSearchs) {
            Settings.post({key:"quickSearchs", value:[]}).then(function(newSetting){
              $scope.quickSearchs = newSetting;
            });
          }
    });

    $scope.saveSettings = function() {
      $scope.imgServer.save().then(function(){
          ProductInfo.setImageServer($scope.imgServer.value);
      });
      $scope.quickSearchs.save().then(function(){
          ProductInfo.setProductQuickSearchs($scope.quickSearchs.value);
      });

      $location.path('/products');
    }
     
  }]);
	

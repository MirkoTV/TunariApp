'use strict';

/**
* @ngdoc service
* @name clientApp.productInfo
* @description
* # productInfo
* Service in the clientApp.
*/
angular.module('tunariApp')
  .service('ProductInfo', ["Settings", "Config", function (Settings, Config) {


    var imgServer = "",
        selectedPriceType = "",
        quickSearchs = [];

    Settings.getList().then(function(settings){
        imgServer = _.find(settings, {'key': 'imgServer'}).value;
        quickSearchs = _.find(settings, {'key': 'quickSearchs'}).value;
        selectedPriceType = _.find(settings, {'key': 'priceTypes'}).value[0];
    });

    this.getProductImageUrl = function(product, suffix) {
        if(product && !_.isEmpty(product.category) && !_.isEmpty(product.properties))
        {
            return  imgServer + "/" +
                    product.category + "/" +
                    (product.properties.type || '' )+ "/" +
                    product.name + suffix +".jpg";
        }
        else {
            return Config.serverOptions.target  + "/images/error.jpg"
        }
    }

    this.setImageServer = function(newImageServer) {
        imgServer = newImageServer;
    }

    this.setProductQuickSearchs = function(newQuickSearchs) {
        quickSearchs = newQuickSearchs;
    }

    this.getProductQuickSearchs = function() {
        return quickSearchs;
    }

    this.setSelectedPriceType = function(newSelectedPriceType) {
        selectedPriceType = newSelectedPriceType;
    }

    this.getSelectedPriceType = function() {
        return selectedPriceType;
    }
}]);
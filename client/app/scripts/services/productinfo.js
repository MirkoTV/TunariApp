'use strict';

/**
 * @ngdoc service
 * @name clientApp.productInfo
 * @description
 * # productInfo
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('ProductInfo', ["ServerData", function (ServerData) {
	
	this.getProductImageUrl = function(product, sufix) {
		if(product && !_.isEmpty(product.category))
		{			
	        return  ServerData.urlImages + "/" + 
	                product.category + "/" + 
	                (product.properties.type || '' )+ "/" +
	                product.name + sufix +".jpg";
		}
		else {
			return ServerData.urlImages  + "notFound.gif"
		}    
    }
        
  }]);

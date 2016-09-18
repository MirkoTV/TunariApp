'use strict';

/**
 * @ngdoc service
 * @name clientApp.search
 * @description
 * # search
 * Service in the clientApp.
 */
angular.module('tunariApp')
  .service('SearchInfo', ['Products', function (Products) {
    
    this.tags = "";

    this.getTags = function(){
    	return this.tags;
    }

    this.setTags = function(tags){
    	this.tags = tags;
    }

    this.getProductNames = function(query) {
    	if (query && query !== "") {
            console.log("asdfsdf")
            var query = query ? {tags:query} : {};                
            query.properties = "name";
            query.querySort = "name";
            query.queryLimit = 10;

            return Products.getList(query).then(function(products) {
                var productNames = _.map(products, 'name');
                
                return productNames;
            });       
        }
        else {
            return [];
        }
    }

  }]);

'use strict';
var x
angular.module('nvServices', ['herokuAPI'])
  .provider('XidSet', function( ){
    var config = {};
    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    
    this.$get = function($http, herokuKey){
      return {
        query: function(params){
          return herokuKey.get().then(function(auth) {
            return $http({
              method: 'GET',
              url:'https://neovac.herokuapp.com/'+params.kind+ '/' + params.value +'.json',
              headers: {
                'Authorization': 'Basic ' + Base64.encode(':'+auth)
              }
            }).success(function(data){
              x = []
              x.length =0
              angular.forEach(data, function(item) {
                x.push(new Object(item))
              });
              return x;
            });
          });
        }
      };
    };
  });

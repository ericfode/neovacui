'use strict';
angular.module('nvServices', ['herokuAPI'])
  .provider('XidSet', function( ){
    var config = {};
    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    
    this.$get = function($http,$q,  herokuKey){
      return {
        query: function(params){
          var def = $q.defer();
          herokuKey.get().then(function(auth) {
            $http({
              method: 'GET',
              url:'https://neovac.herokuapp.com/'+params.kind+ '/' + params.value +'.json',
              headers: {
                'Authorization': 'Basic ' + Base64.encode(':'+auth)
              }
            }).success(function(data){
              def.resolve(data);  
            });
          });
          return def.promise
        }
      };
    };
  });

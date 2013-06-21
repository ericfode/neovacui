'use strict';

angular.module('herokuAPI', ['ngCookies']).
  provider('herokuKey',function(){
    var config ={
      localStorageName: 'herokuApi'
    };

    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    this.$get = function($http,$q){
      return {
        get: function(){
          var defer = $q.defer();
          if( localStorage.token != null){
            defer.resolve(localStorage.token);
          }
          $http.get('/auth').success(function(data) {
            defer.resolve(data.auth);
          });
          return defer.promise;
        }
      };
    };
  });

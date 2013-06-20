'use strict';

angular.module('herokuAPI', ['ngCookies']).
  provider('herokuKey',function(){
    var config ={
      localStorageName: 'herokuApi'
    };

    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    this.$get = function($http){
      return {
        get: function(){
          var api = {};
          $http.get('/auth').success(function(data) {
            api = data.auth;
          });
          if( api === null){
            return localStorage.token;
          }
          return api;
        }
      };
    };
  });

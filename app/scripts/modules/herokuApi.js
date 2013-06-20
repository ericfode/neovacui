'use strict';

angular.module('herokuAPI', ['ngCookies']).
  provider('herokuKey',function($http){
    var config ={
      localStorageName: 'herokuApi'
    };

    $http.get('/auth').success(function(data) {
      var api = data.auth;
      localStorage.token = api;
    });

    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    this.$get = function(){
      return {
        get: function(){
            return localStorage.token;
          }
      };
    };
  });

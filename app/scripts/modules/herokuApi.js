'use strict';

angular.module('herokuAPI', ['ngCookies']).
  provider('herokuKey',function(){
    var config ={
      localStorageName: 'herokuApi'
    };

    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    this.$get = function($cookies){
      return {
        get: function(){
          var cookie = $cookies['token'];
          console.log($cookies.text);
          if (cookie === null){
            cookie = localStorage.token;
          }
          return cookie;
        }
      };
    };
  });

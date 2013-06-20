'use strict';

angular.module('herokuAPI', ['ngCookies']).
  provider('herokuKey',function(){
    var config ={
      localStorageName: 'herokuApi'
    };

    this.extendConfig = function(configExtension){
      config = angular.extend(config, configExtension);
    };
    this.$get = function($cookieStore){
      return {
        get: function(){
          var cookie = $cookieStore.get('token');
          if (cookie === null){
            cookie = localStorage.token;
          }
          return cookie;
        }
      };
    };
  });

'use strict';

angular.module('herokuOauth', ['angularOauth'])
  .constant('HerokuTokenVerifier', function(config, accessToken, deferred) {
    var $injector = angular.injector(['ng']);
    return $injector.invoke(['$http', '$rootScope', function($http, $rootScope) {
      var url = 'https://id.heroku.com/oauth/tokeninfo';

      $rootScope.$apply(function(){
        $http({method: 'GET', url: url, params: {access_token:accessToken}}).
          success(function(data) {
            if (data.audience == config.clientId){
              deferred.resolve(data);
            } else {
              deferred.reject({name: 'invalid_audience'});
            }
      }).
      error(function(data, status, headers, config) {
        deferred.reject({
          name: 'error_response',
          data: data,
          status: status,
          headers: headers,
          config: config
        });
      });
    });
    return deferred;  
  }]);
  }).
  config(function(TokenProvider, HerokuTokenVerifier){
    TokenProvider.extendConfig({
      authorizationEndpoint: 'https://id.heroku.com/oauth/authorize',
      verifiyFunc: HerokuTokenVerifier
    });
  });

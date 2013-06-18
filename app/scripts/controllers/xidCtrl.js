'use strict';

var neovacUIApp = angular.module('neovacUIApp');


neovacUIApp.config(function(TokenProvider){
  var baseUrl = document.URL;
  TokenProvider.extendConfig({
    clientId: '93fd898c-8bd8-41cc-bc22-af5bd04b9408',
    redirectUri: baseUrl + 'auth/heroku/callback',
    authorizationEndpoint: 'https://id.heroku.com/oauth/authorize',
    verifyFunc: function(){
      return true;
    }
  });
});



neovacUIApp.controller( 'xidCtrl', ['$scope','XidSet', '$location',
                       '$routeParams', 'Token',
                       function($scope, XidSet,$location,$routeParams,Token){
    $scope.query = $routeParams.value    
    $scope.updateXidSet = function(){
    console.log('getting xids');
    console.log($routeParams);
    $scope.xids = XidSet.query({value: $routeParams.value,
                               kind: $routeParams.kind});
    console.log('done getting xids');
    console.log($scope.xids);
  };

   $scope.accessToken = Token.get();
   $scope.authenticate = function() {
      Token.getTokenByPopup()
        .then(function(params){
          Token.verifyAsync(params.access_token).
            then(function(data) {
              $scope.accessToken = params.access_token;
              $scope.expiresIn = params.expires_in
              Toekn.set(params.access_token);
            }, function(){
              alert("token failed")
            });
        }, function(){
          alert("failed to get token from popup");
   });
   };
  
   $scope.getDate = function(timestamp){
    // create a new javascript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    var date = new Date(timestamp*1000);
    // hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = date.getMinutes();
    // seconds part from the timestamp
    var seconds = date.getSeconds();
    console.log(timestamp)
    // will display time in 10:30:23 format
    return date.toUTCString();
  }
  $scope.updateLocation = function(){
    var isUUID = /([0-9a-fA-F]*-[0-9a-fA-F]*-[0-9a-fA-F]*-[0-9a-fA-F]*-[0-9a-fA-F]*)/;
    var isAppID = /^[0-9]+$/;
    var kind = '';
    var value = $scope.query;
    if (isUUID.test($scope.query)){
      console.log('found uuid');
      kind = 'request_id';
    }
    else if (isAppID.test($scope.query)){
      console.log('found AppId');
      kind = 'app_id';
    }
    else {
      console.log('found AppName');
      kind = 'app';
    }
    $location.path( kind + '/' + value);
  };
  if($routeParams.value){
    $scope.updateXidSet();
  }
}]);


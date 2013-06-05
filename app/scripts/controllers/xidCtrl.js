'use strict';

neovacUIApp.controller( 'xidCtrl', ['$scope','XidSet', '$location',
                       '$routeParams',
                       function($scope, XidSet,$location,$routeParams){
  $scope.updateXidSet = function(){
    console.log('getting xids');
    console.log($routeParams);
    $scope.xids = XidSet.query({value: $routeParams.value,
                               kind: $routeParams.kind});
    console.log('done getting xids');
    console.log($scope.xids);
  };
  $scope.updateLocation = function(){
    var isUUID = /([0-9a-fA-F]*-[0-9a-fA-F]*-[0-9a-fA-F]*-[0-9a-fA-F]*-[0-9a-fA-F]*)/;
    var isAppID = /^[0-9]+$/;
    var kind = '';
    var value = $scope.query;
    if (isUUID.test($scope.query)){
      console.log('found uuid');
      kind ='xid';
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


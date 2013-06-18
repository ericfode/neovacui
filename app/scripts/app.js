'use strict';

var neovacUIApp = angular.module('neovacUIApp', ['ngResource', 'nvServices','herokuOauth']);

neovacUIApp.config(function ($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/:kind/:value', {
      templateUrl: 'views/main.html',
      controller: 'xidCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});


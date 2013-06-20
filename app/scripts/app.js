'use strict';

var neovacUIApp = angular.module('neovacUIApp', ['ngResource', 'nvServices']);

neovacUIApp.config(function ($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'xidCtrl'
    })
    .when('/:kind/:value', {
      templateUrl: 'views/main.html',
      controller: 'xidCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});


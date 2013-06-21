'use strict';

angular.module('herokuAPI', ['ngCookies', ]).
  factory('herokuKey',function($resource){
    return $resource('/auth');
  });

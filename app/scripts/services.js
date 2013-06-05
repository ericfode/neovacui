'use strict';

angular.module('nvServices', ['ngResource'])
  .factory('XidSet', function($resource){
    return $resource('http://neovac.herokuapp.com/:kind/:value.json',
                     {value: 'value', kind: 'kind'});
  });

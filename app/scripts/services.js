'use strict';

angular.module('nvServices', ['ngResource','herokuAPI'])
  .factory('XidSet', function($resource, herokuKey){
    return $resource('http://neovac.herokuapp.com/:kind/:value.json',
                     {value: 'value', kind: 'kind'}, {
      query:{
        method: 'GET',
        headers:{ 'Authorization' : 'Basic ' + Base64.encode(':'+herokuKey.get())},
        isArray:true
      }
    });
  });

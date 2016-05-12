(function() {
  'use strict';

  angular.module('feedr').factory('searchFactory', searchFactory);

  searchFactory.$inject = ['$http'];

  function searchFactory($http) {
    var factory = { lookup:lookup, getVersion:getVersion, getChampions:getChampions };

    function lookup(name, region) {
      return $http.get('/api/lookup/' + name + '/' + region).then(function(resp) { 
        return resp; 
      });
    }

    function getVersion() {
      return $http.get('/api/version').then(function(resp) { return resp; });
    }

    function getChampions() {
      return $http.get('/api/champions').then(function(resp) { return resp; });
    }

    return factory;
  }
  
})();
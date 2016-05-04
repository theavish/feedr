(function() {
  'use strict';

  angular.module('feedr').factory('searchFactory', searchFactory);

  searchFactory.$inject = ['$http'];

  function searchFactory($http) {
    var factory = { lookup:lookup };

    function lookup(name) {
      return $http.get('/api/lookup/' + name)
        .then(function(resp) { return resp });
    }

    return factory;
  }
  
})();
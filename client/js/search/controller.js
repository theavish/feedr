(function() {
  'use strict';

  angular.module('feedr').controller('searchController', searchController);

  searchController.$inject = ['searchFactory'];

  function searchController(searchFactory) {
    var vm = this;
    vm.lookup = lookup;

    function lookup(name, region) {
      searchFactory.lookup(name, region)
        .then(function(resp) { console.log(resp) });
    }
  }

})();
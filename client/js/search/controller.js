(function() {
  'use strict';

  angular.module('feedr').controller('searchController', searchController);

  searchController.$inject = [];

  function searchController() {
    var vm = this;
    vm.lookup = lookup;

    function lookup(name) {
      console.log('Searching for:', name)
    }
  }

})();
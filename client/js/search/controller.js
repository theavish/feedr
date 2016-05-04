(function() {
  'use strict';

  angular.module('feedr').controller('searchController', searchController);

  searchController.$inject = ['searchFactory'];

  function searchController(searchFactory) {
    var vm = this;
    vm.lookup = lookup;
    vm.loading = false;
    vm.getVersion = getVersion;
    vm.getChampions = getChampions;

    function getChampions() {}

    function getVersion() {
      searchFactory.getVersion().then(function(resp) {
        vm.version = resp.data;
      });
    }

    function lookup(name, region) {
      vm.loading = true;
      searchFactory.lookup(name, region).then(function(resp) {
        vm.name = resp.data.name;
        vm.icon = resp.data.icon;
        vm.games = resp.data.games;
        vm.loading = false;
      });
    }
  }

})();
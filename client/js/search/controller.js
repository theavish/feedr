(function() {
  'use strict';

  angular.module('feedr').controller('searchController', searchController);

  searchController.$inject = ['searchFactory'];

  function searchController(searchFactory) {
    var vm = this;
    vm.lookup = lookup;
    vm.init = init;

    function init() {
      getChampions();
      getVersion();
      vm.loading = false;
    }

    function getChampions() {
      searchFactory.getChampions().then(function(resp) {
        console.log(resp)
      });
    }

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
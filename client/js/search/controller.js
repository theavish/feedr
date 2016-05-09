(function() {
  'use strict';

  angular.module('feedr').controller('searchController', searchController);

  searchController.$inject = ['searchFactory'];

  function searchController(searchFactory) {
    var vm = this;
    vm.lookup = lookup;
    vm.init = init;

    function init() {
      getVersion();
      vm.loading = false;
    }

    function getVersion() {
      searchFactory.getVersion().then(function(resp) {
        vm.version = resp.data;
      });
    }

    function lookup(name, region) {
      if (!name || !region) {
        swal({
          title: 'Error!',
          text: 'Please try again, and don\'t forget to include the region!',
          type: 'error',
          confirmButtonText: 'Okay'
        });
        vm.loading = false;
        return;
      }

      vm.loading = true;
      searchFactory.lookup(name, region).then(function(resp) {
        vm.name = resp.data.name;
        vm.icon = resp.data.icon;
        vm.games = resp.data.games;
        vm.loading = false;
        
        var numOfGamesFed = 0;
        for (var i = 0; i < vm.games.length; i++) {
          if (vm.games[i].feeding) {
            numOfGamesFed++;
          }
        }
        vm.feeder = numOfGamesFed > (vm.games.length / 2) ? 'is' : 'is not';

      });
    }
  }

})();
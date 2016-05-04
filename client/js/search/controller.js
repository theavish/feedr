(function() {
  'use strict';

  angular.module('feedr').controller('search', search);

  search.$inject = [];

  function search() {
    var vm = this;
    vm.lookup = lookup;

    function lookup(name) {
      console.log('Searching for:', name)
    }
  }

})();
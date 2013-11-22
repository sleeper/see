'use strict';

angular.module('ui2App')
  .factory('AuthService', function () {
    var currentUser = 'fred';

    // Public API here
    return {
      currentUser: function() { return currentUser;},
      userLoggedIn: function () { return true; }
    };
  });

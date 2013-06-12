'use strict';

angular.module('seeApp')
  .factory('AuthService', function () {
    var currentUser = 'fred';

    // Public API here
    return {
      currentUser: function() { return currentUser;},
      userLoggedIn: function () { return true; }
    };
  });

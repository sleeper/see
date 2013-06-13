'use strict';

angular.module('seeApp')
  .factory('Page', function () {

    var title = '';

    // Public API here
    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle; }
    };
  });

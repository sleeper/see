'use strict';

angular.module('seeApp')
  .directive('notInSet', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
         // scope = the parent scope
        // elem = the element the directive is on
        // attr = a dictionary of attributes on the element
        // ctrl = the controller for ngModel.
      link: function postLink(scope, element, attrs, ctrl) {
        console.log('FRED ', scope, element, attrs, ctrl);
        var setName = attrs['notInSet'];
        var set = scope[setName];
        console.log('FRED, ', setName, set);
        // add a parser that will process each time the value is
        // parsed into the model when the user updates it.
        // Called each time the value is parsed in the model (i.e. user
        // updates it)
        ctrl.$parsers.unshift(function(value) {
          var present = set.filter(function(room) { return room.name === value; });
          var valid = present.length === 0;
          ctrl.$setValidity('notInSet', valid);
          return valid ? value : undefined;
        });

        // Will be processed each time the value is changed on the DOM
        ctrl.$formatters.unshift(function(value) {
          var present = set.filter(function(room) { return room.name === value;});
          ctrl.$setValidity('notInSet', present.length === 0);
          return value;
        });
      }
    };
  });

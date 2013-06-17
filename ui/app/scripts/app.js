'use strict';

angular.module('seeApp', [])
  .config(function ($routeProvider) {
      // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ChatroomsListCtrl'
      })
      .when('/chatrooms/:name', {
        templateUrl: 'views/chatroom.html',
        controller: 'ChatroomCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      // $locationProvider.html5Mode(true);
  });

define([
  'app',
  'services/event',
  
], function (app) {
  'use strict';

  app.controller('DashboardCtrl', [
    '$scope',
    '$state',
    'eventService',
    function ($scope, $state, eventService) {

        $scope.apiKey = 'AIzaSyDj-itD55F7tSVIxktAjntBmYAaaFtXRds';
        $scope.height = window.screen.height;
        $scope.width = window.screen.width;

      $scope.search = {};
      $scope.goToList = function () {
        $state.go('results', {
          search: $scope.search.string,
          satTrans: $scope.search.satTrans,
          wheelChair: $scope.search.wheelChair,
          wheelChairLift: $scope.search.wheelChairLift
        });
      };

      $scope.loadNext = function () {
        eventService.getNext().then(function (events) {
          $scope.events = events;
        }).finally(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };
    }
  ]);
});

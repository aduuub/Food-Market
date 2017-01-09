define([
  'app',
  'services/page',
  'services/user'
  ], function (app) {
    'use strict';

    app.controller('AppCtrl', [
      '$scope',
      '$ionicModal',
      '$ionicScrollDelegate',
      '$sce',
      '$ionicPopup',
      'pageService',
      '$state',
      'userService',
      function ($scope, $ionicModal, $ionicScrollDelegate, $sce, $ionicPopup, pageService, $state, userService) {
        $scope.ready = true;

        pageService.get().then(function (pages) {
          $scope.pages = pages;
        });

        $ionicModal.fromTemplateUrl('app/templates/page.html', {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
        });

        $scope.openModal = function (index) {
          var notEqual = index !== $scope.currentPage;
          if (notEqual) {
            $scope.opening = true;
            $scope.currentPage = index;
          }
          $scope.modal.show().then(function () {
            if (notEqual) {
              $ionicScrollDelegate.$getByHandle('modal').scrollTop();
            }
            $scope.opening = false;
          });
        };

        $scope.trustHtml = function (html) {
          return $sce.trustAsHtml(html);
        };

        $scope.closeModal = function () {
          $scope.modal.hide();
        };

    

     $scope.logout = function () {
          $ionicPopup.confirm({
            scope: $scope,
            title: '<span class="energized">Log out</span>',
            subTitle: '<span class="stable">Are you sure you would like to log out?</span>',
            inputType: 'text',
            inputPlaceholder: ''
          }).then(function (res) {
            if (res) {
                Parse.User.logOut();
                $state.go('login');
        }
      });
        };


   }
   ]);
  });

define([
  'app',
  'services/user'

], function (app) {
  'use strict';
  var pubnub;
  console.log("about to run the app");
  // the run blocks
  app
    .run([
      '$ionicPlatform',
      '$state',
      'userService',
      '$rootScope',

      // 'parse-starter.controllers', 
      // 'parse-starter.factories',
      function ($ionicPlatform, $state, userService, $rootScope) {

        console.log("about to initialize parse");
        // Parse.initialize("uvQmMNsdZStxEvEfMeMdrH85sGW7wKMl8Ms2Bm0j", "YHcdSEyXhQ8qX0vykcFCerM4rQmajQG22iu44BvT", "0gauJiwUIqjTabTNOOZEcgE17wGxFyKtPq8g40sm", "z4wnNa2HnXgPly14Z3sDzxl8LDlMwj6WroUMuamT");
        
         Parse.initialize("uvQmMNsdZStxEvEfMeMdrH85sGW7wKMl8Ms2Bm0j", "YHcdSEyXhQ8qX0vykcFCerM4rQmajQG22iu44BvT", "z4wnNa2HnXgPly14Z3sDzxl8LDlMwj6WroUMuamT");
        Parse.serverURL = 'https://parseapi.back4app.com/';
        //Parse.FacebookUtils.init();


        $ionicPlatform.ready(function () {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          // if (window.cordova && window.cordova.plugins.Keyboard) {
          //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          //   cordova.plugins.Keyboard.disableScroll(true);
          // }
          if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }

          $rootScope.start = false;
          // $rootScope.pubnub = pubnub;




          if (Parse.User.current()) {
            userService.username = Parse.User.current().get('username');
            
            if (Parse.User.current().get('total_unread') > 0) {
              
              console.log("the damn total is: " + $rootScope.totalMessages);
            }
            else {

              $rootScope.totalMessages = 0;
            }

            //console.log(Parse.User.current().get('username'));

            $state.go('dashboard');
          } else {
            $state.go('login');
          }

        });
      }
    ])
    .factory('PubNubService', function () {
      pubnub = null;
      // var authKey = PUBNUB.uuid();


      pubnub = PUBNUB.init({
        publish_key: 'pub-c-30d2f626-ff6d-4379-bad2-a2513d33a646',
        subscribe_key: 'sub-c-4b18eb38-e884-11e6-81cc-0619f8945a4f',
        origin: 'pubsub.pubnub.com',
        ssl: false,
        //uuid: Parse.User.current().id,
      })
      console.log("pubnub created");

      //pubnub.set_uuid(Parse.User.current().id);

      return pubnub;

    })
    .factory('ShareFactory', function(){
    var data = {
        number: ''
    };
    return{
        setValue: function(number){
            data.number = number;
        },
        getValue: function(){
            return data.number
        }
    };
});

});

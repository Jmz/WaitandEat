'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {


  }])

  .controller('WaitlistController', ['$scope', '$firebase', 'FIREBASE_URL', function($scope, $firebase, FIREBASE_URL) {
    
  		var partiesRef = new Firebase(FIREBASE_URL + 'parties');

  		$scope.parties = $firebase(partiesRef);

  		$scope.newParty = { name: '', phone: '', size: '', done: false, notified: 'No' };

      // Save a new party
  		$scope.saveParty = function() {

  			$scope.parties.$add($scope.newParty);

  			$scope.newParty = { name: '', phone: '', size: '', done: false, notified: 'No' };

  		}

      // Send a text message
      $scope.sendTextMessage = function(party) {

        var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
        var textMessages = new $firebase(textMessageRef);
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        };
        textMessages.$add(newTextMessage);
        party.notified = 'Yes';
        $scope.parties.$save(party.$id);
      };

  }])

  .controller('AuthController', ['$scope', '$firebaseSimpleLogin', '$location', 'FIREBASE_URL', function($scope, $firebaseSimpleLogin, $location, FIREBASE_URL) {

    var authRef = new Firebase(FIREBASE_URL + 'textMessages');
    var auth = $firebaseSimpleLogin(authRef);

    $scope.user = {email: '', password: ''};

    $scope.register = function() {

      auth.$createUser($scope.user.email, $scope.user.password).then(
        function(data) {
          $scope.login();
        },
        function(data) {
          console.log(data);
        }
      );

    }

    $scope.login = function() {

      auth.$login('password', $scope.user).then(
        function(data) {
          $location.path('/waitlist');
        },
        function(data) {
          console.log(data);
        }
      );

    }

    $scope.logout = function() {
      auth.$logout();
      $location.path('/');
    }

  }]);
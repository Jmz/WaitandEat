'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {


  }])

  .controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
    
  		var partiesRef = new Firebase('https://waitandeat1234.firebaseio.com/parties');

  		$scope.parties = $firebase(partiesRef);

  		$scope.newParty = { name: '', phone: '', size: '' };

      // Save a new party
  		$scope.saveParty = function() {

  			$scope.parties.$add($scope.newParty);

  			$scope.newParty = { name: '', phone: '', size: '' };

  		}

      // Send a text message
      $scope.sendTextMessage = function(phoneNumber) {

        var textMessageRef = new Firebase('https://waitandeat1234.firebaseio.com/textMessages');
        var textMessages = new $firebase(textMessageRef);

        textMessages.$add({phoneNumber: phoneNumber});

      };

  }]);
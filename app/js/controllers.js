'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('LandingPageController', [function() {


  }])

  .controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
    
  		var partiesRef = new Firebase('https://waitandeat1234.firebaseio.com/parties');

  		$scope.parties = $firebase(partiesRef);

  		$scope.newParty = { name: '', phone: '', size: '', done: false, notified: 'No' };

      // Save a new party
  		$scope.saveParty = function() {

  			$scope.parties.$add($scope.newParty);

  			$scope.newParty = { name: '', phone: '', size: '', done: false, notified: 'No' };

  		}

      // Send a text message
      $scope.sendTextMessage = function(party) {

        var textMessageRef = new Firebase('https://waitandeat1234.firebaseio.com/textMessages');
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

  }]);
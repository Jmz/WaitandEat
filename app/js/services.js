'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
	.value('FIREBASE_URL', 'https://waitandeat1234.firebaseio.com/')
	.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL) {
	   	var authRef = new Firebase(FIREBASE_URL);
	   	var auth = $firebaseSimpleLogin(authRef);

		var authServiceObject = {

			login: function(user) {
				auth.$login('password', user).then(
	       			function(data) {
	         				$location.path('/waitlist');
	       			},
	       			function(data) {
	         				console.log(data);
	       			}
	 				);
			},

			register: function(user) {
				auth.$createUser(user.email, user.password).then(
	       			function(data) {
	         				authServiceObject.login(user);
	       			},
	       			function(data) {
	         				console.log(data);
	       			}
	     			);
			},

			logout: function() {
				auth.$logout();
	     			$location.path('/');
			}

		};

		$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
	     	$rootScope.currentUser = user;
	   	});

	   	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
	     		$rootScope.currentUser = null;
	   	});

		return authServiceObject;
	});

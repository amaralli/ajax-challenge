"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
angular.module('RatingApp', ['ui.bootstrap'])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'rQeM2ArYhVBU8TbvsKejTFReegqA2ss5e6WEYTXW'
		$httpProvider.defaults.headers.common["X-Parse-REST-API-Key"] = 'd2hH5a1zBhtuLQv38oo57KOPhWW0rQgz5xoyB0Oz'
	})

	.controller('RatingController', function($scope, $http) {

		var parseURL = "https://api.parse.com/1/classes/comments";

		$scope.refreshComments = function() {
			//$scope.updating = true;
			$http.get(parseURL)
				.success(function(data) {
					$scope.comments = data.results;
					console.log("refreshed!");
				});
				// .error(function (err) {
				// 	console.log(err);
				// })
				// .finally(function() {
				// 	$scope.updating = false;
				// })
		};

		$scope.postComment = function() {
			$scope.inserting = true;
			$http.post(parseURL, $scope.newComment)
				.success(function(responseData) {
					$scope.newComment.objectId = responseData.objectId;
					$scope.comments.push($scope.newComment);
				})
				.error(function (err) {
					console.log(err);
				})
				.finally(function() {
					$scope.inserting = false;
				});
		};
		$scope.refreshComments();

		$scope.deleteComment = function(comment) {
			$http.delete(parseURL + "/" + comment.objectId)
				.success(function(data) {
					console.log("Comment Successfully Deleted");
				})
				.error(function (err) {
					console.log(err);
				});
		};

		//$scope.

	});






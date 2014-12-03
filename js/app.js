"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var parseURL = "https://api.parse.com/1/classes/comments";

angular.module('RatingApp', ['ui.bootstrap'])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'rQeM2ArYhVBU8TbvsKejTFReegqA2ss5e6WEYTXW';
		$httpProvider.defaults.headers.common["X-Parse-REST-API-Key"] = 'd2hH5a1zBhtuLQv38oo57KOPhWW0rQgz5xoyB0Oz';
	})

	.controller('RatingController', function($scope, $http) {



		$scope.refreshComments = function() {
            console.log("log 1");
			$http.get(parseURL)
				.success(function(data) {
					$scope.comments = data.results;
					console.log("refreshed!");
				})
				.error(function (err) {
                console.log("log 2cvcvcvcv");
					console.log(err);
				})
				.finally(function() {
					$scope.updating = false;
				});
		};

        console.log("FUCKSOIHRWKHRKJJ");
		$scope.postComment = function () {
            console.log("log 1");
			$scope.inserting = true;
			$http.post(parseURL, $scope.newComment)
				.success(function(responseData) {
                    console.log("log 2");
					$scope.newComment.objectId = responseData.objectId;
                    console.log("log 3");
					$scope.comments.push($scope.newComment);
                    console.log("log 4");
				})
				.error(function (err) {
					console.log("FUCK -> " + err);
                    console.log($scope.newComment);
				})
				.finally(function() {
                    console.log("log 5");
					$scope.inserting = false;
				});
		};
        console.log("qqq1");
		$scope.refreshComments();

		$scope.deleteComment = function(comment) {
			$http.delete(parseURL + "/" + comment.objectId)
				.success(function (data) {
					console.log("Comment Successfully Deleted");
				})
				.error(function (err) {
					console.log("FUCK -> " + err);
				});
		};

		//$scope.
        console.log("qqq2");

	});






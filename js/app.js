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

	.controller('CommentController', function($scope, $http) {

		$scope.refreshComments = function() {
            console.log("log 1");
			$http.get(parseURL + "?order=-score")
				.success(function(data) {
					$scope.comments = data.results;
					console.log("refreshed!");
					console.log(data.results);
				})
				.error(function (err) {
                console.log("log 2cvcvcvcv");
					console.log(err);
				})
				.finally(function() {
					$scope.updating = false;
				});
		};
		$scope.refreshComments();


		$scope.postComment = function () {
            console.log("log 1");
            var newComment = {
            	score: 0
        	};
			$scope.inserting = true;
			$http.post(parseURL, $scope.newComment)
				.success(function(responseData) {
                    console.log("log 2");
					newComment.objectId = responseData.objectId;
                    console.log("log 3");
					$scope.comments.push($scope.newComment);
                    console.log("log 4");
                    $scope.newComment = {done: false};
				})
				.error(function (err) {
					console.log(err);
                    console.log($scope.newComment);
				})
				.finally(function() {
                    console.log("log 5");
					$scope.inserting = false;
				});
		};

        $scope.updateComments = function(comment) {
        	$http.put(parseURL + "/" + comment.objectId, comment)
        		.success(function() {
        			console.log("successfully updated");
        		});
        };

        $scope.incrementScore = function(comment, increment) {
        	var postData = {
        		score: {
	        		__op: "Increment",
	        		amount: increment
        		}	
        	};

        	$scope.updating = true;
        	$http.put(parseURL + '/' + comment.objectId, postData)
        		.success(function (respData) {
        			comment.score = respData.score;
        		})
        		.error(function(error){
        			console.log(error)
        		})
        		.finally(function(){
        			$scope.updating = false;
        		});
        };

		$scope.deleteComment = function(comment) {
			$http.delete(parseURL + "/" + comment.objectId)
				.success(function () {
					console.log("Comment Successfully Deleted");
					$scope.refreshComments();
				})
				.error(function (err) {
					console.log(err);
				});
		};

	});






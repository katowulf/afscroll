
var app = angular.module('app', ['firebase', 'infinite-scroll']);

app.controller('ctrl', function($scope, $firebaseArray) {
  $scope.world = 'world';
  var baseRef = new Firebase('https://fbutil.firebaseio.com/paginate');
  var scrollRef = new Firebase.util.Scroll(baseRef, 'number');
  $scope.items = $firebaseArray(scrollRef);
  $scope.items.scroll = scrollRef.scroll;
});
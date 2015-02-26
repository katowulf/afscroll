
var app = angular.module('app', ['firebase', 'ui.grid']);

app.controller('ctrl', function($scope, $firebaseArray) {
  $scope.world = 'world';
  var baseRef = new Firebase('https://fbutil.firebaseio.com/paginate');
  var scrollRef = new Firebase.util.Scroll(baseRef, 'number');
  //$scope.data = $firebaseArray(scrollRef);
  $scope.opts = {
    data: $firebaseArray(scrollRef),
    columnDefs: [
      {name: '$id', displayName: 'ID'},
      {name: 'string'},
      {name: 'number'},
      {name: 'timestamp', displayName: 'Date'},
      {name: '$priority', displayName: 'Priority'}
    ]
  };
  $scope.opts.data = $firebaseArray(scrollRef);
  $scope.opts.data.scroll = scrollRef.scroll;
  scrollRef.scroll.next(25);
});

var app = angular.module('app', ['firebase', 'ui.grid', 'ui.grid.infiniteScroll']);

app.controller('ctrl', function($scope, $firebaseArray) {
  $scope.world = 'world';
  var baseRef = new Firebase('https://fbutil.firebaseio.com/paginate');
  var scrollRef = new Firebase.util.Scroll(baseRef, 'number');

  //$scope.data = $firebaseArray(scrollRef);
  $scope.opts = {
    columnDefs: [
      {name: '$id', displayName: 'ID'},
      {name: 'string'},
      {name: 'number'},
      {name: 'timestamp', displayName: 'Date'},
      {name: '$priority', displayName: 'Priority'}
    ]
  };
  $scope.opts.data = $firebaseArray(scrollRef);
  scrollRef.scroll.next(25);

  $scope.opts.onRegisterApi = function(gridApi){
    gridApi.infiniteScroll.on.needLoadMoreData($scope,function(){
      scrollRef.scroll.next(25);
    });
    gridApi.infiniteScroll.on.needLoadMoreDataTop($scope,function(){
      scrollRef.scroll.prev(25);
    });

    $scope.opts.data.$watch(function() {
      $scope.$evalAsync(function() {
        gridApi.infiniteScroll.dataLoaded();
      });
    });
  };
});
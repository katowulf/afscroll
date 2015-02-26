/**
 * Created by katowulf on 2/20/15.
 */
(function () {
  'use strict';

  console.log('af.scroll loaded'); //debug

  angular.module('af.scroll', [])
    .directive('afScroll', function() {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div><ng-transclude></ng-transclude></div>',
        scope: { 'scrollList': '=list' },
        controller: function($scope, $element, $transclude) {
          console.log('$element', $element); //debug
          var list = $scope.scrollList;
          var elms = {};
          $scope.$watchCollection('scrollList', function() {
            angular.forEach(elms, function(elm, key) {
              if( list.$getRecord(key) === null ) {
                console.log('deleted', key); //debug
                elm.remove();
                delete elms[key];
              }
            });

            angular.forEach(list, function(rec) {
              if( !elms.hasOwnProperty(rec.$id) ) {
                console.log('added', rec.$id); //debug
                $transclude(function(clone, scope) {
                  scope.item = rec;
                  elms[rec.$id] = clone;
                  clone.data('data-id', rec.$id);
                  $element.append(clone);
                });
              }
            });
          });
        }
      }
    });

  var app = angular.module('app', ['firebase', 'af.scroll']);

  app.controller('ctrl', function($scope, $firebaseArray, $timeout) {
    $scope.world = 'world';
    //var baseRef = new Firebase('https://fbutil.firebaseio.com/paginate');
    //var scrollRef = new Firebase.util.Scroll(baseRef, 'number');
    $scope.list = [
      {$id: 'a'},
      {$id: 'b'},
      {$id: 'c'},
      {$id: 'd'},
      {$id: 'e'}
    ];

    $scope.list.$keyAt = function(rec) {
      return (find($scope.list, function(item) {
        return rec === item;
      })||{$id: null}).$id;
    };

    $scope.list.$getRecord = function(key) {
      return find($scope.list, function(rec) {
        return rec.$id === key;
      });
    };

    $timeout(function() {
      $scope.list.push({$id: 'f'});
      $timeout(function() {
        $scope.list.splice(2, 1);
      }, 500);
    }, 500);
  });

  function find(list, iterator) {
    var res = null;
    angular.forEach(list, function(rec) {
      if( res === null && iterator(rec) === true ) {
        res = rec;
      }
    });
    return res;
  }


})();
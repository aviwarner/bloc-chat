(function() {
  function HomeCtrl($scope, Room) {
    $scope.rooms = Room;
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();

(function() {
  function ModalCtrl($scope, $uibModalInstance, Room) {
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    }
    $scope.ok = function() {
      if ($scope.roomname) {
        Room.add($scope.roomname);
        $uibModalInstance.close('room created');
      }
    }
  }

  angular
    .module('blocChat')
    .controller('ModalCtrl', ['$scope', '$uibModalInstance', 'Room', ModalCtrl]);
})();

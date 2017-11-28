(function() {
  function HomeCtrl($uibModal, $scope, Room) {
    $scope.rooms = Room;

    this.open = function() {
      var modal = $uibModal.open({
        templateUrl: '/templates/modal.html',
        controller: 'ModalCtrl',
        size: 'sm',
        animation: false
      });

    }

  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$uibModal', '$scope', 'Room', HomeCtrl]);
})();

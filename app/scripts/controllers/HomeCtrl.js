(function() {
  function HomeCtrl($uibModal, $scope, Room, Message) {
    $scope.rooms = Room;
    $scope.currentRoom = null;

    this.setRoom = function(room) {
      $scope.currentRoom = room;
    }

    $scope.messages = Message;

    this.openModal = function() {
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
    .controller('HomeCtrl', ['$uibModal', '$scope', 'Room', 'Message', HomeCtrl]);
})();

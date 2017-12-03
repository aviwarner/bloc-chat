(function() {
  function HomeCtrl($uibModal, $scope, $cookies, Room, Message) {
    $scope.rooms = Room;
    $scope.currentRoom = null;

    this.setRoom = function(room) {
      $scope.currentRoom = room;
    }

    $scope.messages = Message;

    $scope.form = {};

    this.sendMessage = function() {
      $scope.message.roomId = $scope.currentRoom.$id;
      $scope.message.username = $cookies.get('blocChatCurrentUser');
      $scope.message.sentAt = Date.now();
      Message.send($scope.message);
      $scope.form.messageSubmit.$setPristine();
      $scope.message.content = '';
    }

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
    .controller('HomeCtrl', ['$uibModal', '$scope', '$cookies', 'Room', 'Message', HomeCtrl]);
})();

(function() {
  function HomeCtrl($uibModal, $scope, $cookies, Room, Message) {
    this.rooms = Room;
    this.currentRoom = null;
    this.currentUser = $cookies.get('blocChatCurrentUser');

    this.setRoom = function(room) {
      this.currentRoom = room;
    }

    this.messages = Message;

    this.form = {};

    this.sendMessage = function() {
      this.message.roomId = this.currentRoom.$id;
      this.message.username = $cookies.get('blocChatCurrentUser');
      this.message.sentAt = Date.now();
      Message.send(this.message);
      this.message.content = '';
    }

    this.activeTyping = function() {
      Room.activeTyping(this.currentRoom, this.currentUser);
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

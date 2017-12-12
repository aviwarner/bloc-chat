(function() {
  function HomeCtrl($uibModal, $scope, $cookies, Room, Message, Auth) {
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

    this.newRoom = function() {
      var modal = $uibModal.open({
        templateUrl: '/templates/new-room-modal.html',
        controller: 'RoomModalCtrl',
        size: 'sm',
        animation: false
      });
    }

    this.loginModal = function() {
      var modal = $uibModal.open({
        templateUrl: '/templates/login-modal.html',
        controller: 'AuthModalCtrl',
        controllerAs: 'auth',
        size: 'sm',
        animation: false
      });
    }

    this.signOut = function() {
      Auth.authObj.$signOut();
      console.log(Auth.authObj.$getAuth());
    }

  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['$uibModal', '$scope', '$cookies', 'Room', 'Message', 'Auth', HomeCtrl]);
})();

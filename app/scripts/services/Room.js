(function() {
  function Room($firebaseArray) {
    var Room = {};
    var ref = firebase.database().ref().child("rooms");
    var rooms = $firebaseArray(ref);
    Room.all = rooms;

    Room.add = function(roomName) {
      var room = {}
      room.roomName = roomName;
      room.typingUser = '';
      room.activeTyping = false;
      console.log(room);

      rooms.$add(room).then(function(ref) {
        var id = ref.key;
        rooms.$indexFor(id);
      });
    }

    Room.activeTyping = function(room, currentUser) {
      if (!room.activeTyping) {
        room.activeTyping = true;
        room.typingUser = currentUser;
        rooms.$save(room);
        setTimeout(Room.clearTyping, 1500, room);
      }
    }

    Room.clearTyping = function(room) {
      console.log('clearing');
      room.activeTyping = false;
      room.typingUser = '';
      rooms.$save(room);
    }

    return Room;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();

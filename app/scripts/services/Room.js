(function() {
  function Room($firebaseArray) {
    var Room = {};
    var ref = firebase.database().ref().child("rooms");
    var rooms = $firebaseArray(ref);
    Room.all = rooms;

    Room.add = function(room) {
      rooms.$add(room).then(function(ref) {
        var id = ref.key;
        rooms.$indexFor(id);
      });

    }

    return Room;
  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();

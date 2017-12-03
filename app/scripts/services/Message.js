(function() {
  function Message($firebaseArray, $rootScope, $cookies) {
    var Message = {};
    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);

    Message.getByRoomId = function(roomId) {
      messages = $firebaseArray(ref.orderByChild("roomId").equalTo(roomId));
      Message.all = messages;
    };

    Message.send = function(newMessage) {
      // Send method logic
      messages.$add(newMessage).then(function(ref) {
        var id = ref.key;
        messages.$indexFor(id);
      });

    }

    return Message;
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', '$rootScope', '$cookies', Message]);
})();

(function() {
  function Message($firebaseArray, $rootScope, $cookies) {
    var Message = {};
    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);
    var activeTyping = false;

    Message.getByRoomId = function(roomId) {
      messages = $firebaseArray(ref.orderByChild("roomId").equalTo(roomId));
      Message.all = messages;
    };

    Message.send = function(newMessage) {
      messages.$add(newMessage).then(function(ref) {
        var id = ref.key;
        messages.$indexFor(id);
      });
    };

    Message.typing = function() {
      
    };

    return Message;
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', '$rootScope', '$cookies', Message]);
})();

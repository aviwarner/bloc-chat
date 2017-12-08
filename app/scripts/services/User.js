(function() {
  function User($firebaseArray, $rootScope, $cookies) {
    var User = {};
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);

    User.getByUserId = function(userId) {
      // Get current userUID
      users = $firebaseArray(ref.orderByChild("userId").equalTo(userId));
    };

    User.addUser = function(userId, username) {
        // add a new record to 'users' firebase table with username & userUID (to tie to auth table)
      });
    };


    };

    return Message;
  }

  angular
    .module('blocChat')
    .factory('User', ['$firebaseArray', '$rootScope', '$cookies', User]);
})();

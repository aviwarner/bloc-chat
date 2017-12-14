(function() {
  function User($firebaseArray, $rootScope, $cookies) {
    var User = {};
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);

    User.getByUserId = function(userId) {
      // Get current userUID
      users = $firebaseArray(ref.orderByChild("userId").equalTo(userId));
    };

    User.addUser = function(userUID, email) {
        // add a new record to 'users' firebase table with username & userUID (to tie to auth table)
        var user = {};
        user.userUID = userUID;
        user.email = email;
        user.admin = false;
        console.log(user);
        
        users.$add(user).then(function(ref) {
          var id = ref.key;
          users.$indexFor(id);
        });
    };

    User.currentUser = function() {
      // currently logged in user
    }

    return User;
  }

  angular
    .module('blocChat')
    .factory('User', ['$firebaseArray', '$rootScope', '$cookies', User]);
})();

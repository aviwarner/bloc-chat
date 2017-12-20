(function() {
  function User($firebaseArray, $firebaseObject, $rootScope, $cookies) {
    var User = {};
    var ref = firebase.database().ref().child("users");
    // var usersObj = $firebaseObject(ref);
    var users = $firebaseArray(ref);
    User.currentUserID = '';
    User.currentUserRec = {};
    User.all = users;

    var userIdMatch = function(id) {
      return users.uid === id;
    }

    User.onlineStatus = function(userUID, status) {
      // Get current userUID;
      var user = {}
      var userArray = $firebaseArray(ref.orderByChild("userUID").equalTo(userUID));
      User.currentUserID = userArray.$loaded(function() {
        user = users.$getRecord(userArray.$keyAt(0));
        return User.loggedIn(user, status);
      });
    };

    User.loggedIn = function(user, status) {
      console.log(user)
      user.online = status;
      return users.$save(user).then(function(ref) {
        ref.key === user.$id; // true
        console.log(user);
      }, function(error) {
        console.log("Error:", error);
      });
    }

    User.addUser = function(email, uid) {
        // add a new record to 'users' firebase table with username & userUID (to tie to auth table)
        var userObj = {};
        userObj.userUID = uid;
        userObj.email = email;
        userObj.admin = false;
        console.log(userObj);
        users.$add(userObj).then(function(ref) {
          User.currentUserID = ref.key;
          users.$indexFor(User.currentUserID);
        });
    };

    User.flipAdmin = function(user) {
      user.admin = !user.admin;
      return users.$save(user).then(function(ref) {
        ref.key === user.$id; // true
        console.log(user);
      }, function(error) {
        console.log("Error:", error);
      });
    }
    //
    // User.userStatus = function(user, boolean) {
    //   user.currentlyLoggedIn = boolean;
    //   return users.$save(user).then(function(ref) {
    //     ref.key === user.$id; // true
    //     console.log(user);
    //   }, function(error) {
    //     console.log("Error:", error);
    //   });
    // }

    return User;
  }

  angular
    .module('blocChat')
    .factory('User', ['$firebaseArray', '$firebaseObject', '$rootScope', '$cookies', User]);
})();

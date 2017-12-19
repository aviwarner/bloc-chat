(function() {
  function User($firebaseArray, $firebaseObject, $rootScope, $cookies) {
    var User = {};
    var ref = firebase.database().ref().child("users");
    // var usersObj = $firebaseObject(ref);
    var users = $firebaseArray(ref);
    User.currentUserID = '';
    User.all = users;

    var userIdMatch = function(id) {
      return users.uid === id;
    }

    User.getByUserId = function(id) {
      // Get current userUID
      // var userObj = $firebaseArray(ref.orderByChild("userUID").equalTo(id));
      // console.log(userObj);
    };

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

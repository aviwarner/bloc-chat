(function() {
  function User($firebaseArray, $rootScope, $cookies) {
    var User = {};
    var ref = firebase.database().ref().child("users");
    var users = $firebaseArray(ref);
    User.all = users;

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

    User.updateUser = function(field, value, userUID) {
      user = $firebaseArray(ref.orderByChild("userUID").equalTo(userUID));
      user.admin = true;
      console.log(user);
      ref.key = user.$id;
      console.log(ref.key);
      users.$save(user).then(function(ref) {
        ref.key === user.$id; // true
      }, function(error) {
        console.log("Error:", error);
      });
    }

    // $scope.updateItem = function() {
    //   console.log('$scope.items was',$scope.items);
    //   var id = prompt("Enter $id to update");
    //   var someItem = itemsList.$getRecord(id);
    //   var newField = prompt('Enter new value for newField');
    //   someItem.newField = newField;
    //   itemsList.$save(someItem).then(function(ref) {
    //     console.log('$scope.items is now',$scope.items);
    //   });;
    // }

    User.currentUser = function() {
      // currently logged in user
    }

    return User;
  }

  angular
    .module('blocChat')
    .factory('User', ['$firebaseArray', '$rootScope', '$cookies', User]);
})();

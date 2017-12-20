(function() {
  function Auth($rootScope, $firebaseAuth, $firebaseArray, $cookies, User) {
    var Auth = {};
    var ref = firebase.database().ref().child("users");
    // var users = $firebaseArray(ref);
    Auth.error = '';
    Auth.authObj = $firebaseAuth();

    Auth.createUser = function(email, password) {
      Auth.authObj.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            console.log("User " + firebaseUser.uid + " created successfully!");
            User.addUser(email, firebaseUser.uid);
            Auth.login(email, password);
          }).catch(function(error) {
            Auth.error = error.message;
          });
    }

    Auth.logout = function() {
      var firebaseUser = Auth.authObj.$getAuth();
      $cookies.remove('blocChatCurrentUser');
      User.onlineStatus(firebaseUser.uid, false);
      return function(){
        Auth.authObj.$signOut();
      };
    }

    Auth.login = function(email, password) {
      Auth.error = '';
      Auth.authObj.$signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            console.log("Signed in as: " + firebaseUser.uid);
            $rootScope.$broadcast('loggedIn', true);
            User.onlineStatus(firebaseUser.uid, true);
            $cookies.put('blocChatCurrentUser', email);
          }).catch(function(error) {
            Auth.error = error.message;
            console.log(Auth.error);
          });
    }

    return Auth;
  }

  angular
    .module('blocChat')
    .factory('Auth', ['$rootScope', '$firebaseAuth', '$firebaseArray', '$cookies', 'User', Auth]);
})();

(function() {
  function Auth($firebaseAuth, $cookies) {
    var Auth = {};
    var ref = firebase.database().ref().child("users");
    var currentUser = {};
    Auth.error = '';
    Auth.authObj = $firebaseAuth();

    Auth.createUser = function(email, password) {
      Auth.authObj.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            console.log("User " + firebaseUser.uid + " created successfully!");
            Auth.login(email, password);
          }).catch(function(error) {
            Auth.error = error.message;
          });
    }

    Auth.login = function(email, password) {
      console.log('email is ' + email);
      Auth.authObj.$signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            console.log("Signed in as: " + firebaseUser.uid);
            currentUser.uid = firebaseUser.uid;
            currentUser.email = email;
            $cookies.put('blocChatCurrentUser', currentUser.email);
            return currentUser;
          }).catch(function(error) {
            Auth.error = error.message;
            console.log(Auth.error);
          });
    }

    Auth.logout = function() {
      console.log('log out attempt');
    }

    return Auth;
  }

  angular
    .module('blocChat')
    .factory('Auth', ['$firebaseAuth', '$cookies', Auth]);
})();

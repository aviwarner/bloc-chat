(function() {
  function AuthCtrl($scope, $rootScope, $firebaseAuth, $uibModalInstance, $uibModal, $cookies) {
    var ref = firebase.database().ref().child("users");
    var currentUser = {};
    $rootScope.authObj = $firebaseAuth();

    $scope.createUser = function(email, password) {
      $rootScope.authObj.$createUserWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            console.log("User " + firebaseUser.uid + " created successfully!");
            $scope.login(email, password);
            $uibModalInstance.close();
          }).catch(function(error) {
            $scope.error = error.message;
          });
    }

    $scope.login = function(email, password) {
      $rootScope.authObj.$signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
            console.log("Signed in as: " + firebaseUser.uid);
            currentUser.uid = firebaseUser.uid;
            currentUser.email = email;
            $cookies.put('blocChatCurrentUser', currentUser.email);
            $uibModalInstance.close();
          }).catch(function(error) {
            $scope.error = error.message;
          });
    }

    $scope.logout = function() {
      console.log('log out attempt');
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('Cancel');
    }

    $scope.authModal = function() {
      $uibModalInstance.dismiss('cancel');
      var modal = $uibModal.open({
        templateUrl: '/templates/auth-modal.html',
        controller: 'AuthCtrl',
        size: 'sm',
        animation: false
      });
    }

  }

  angular
    .module('blocChat')
    .controller('AuthCtrl', ['$scope', '$rootScope','$firebaseAuth', '$uibModalInstance', '$uibModal', '$cookies', AuthCtrl]);
})();

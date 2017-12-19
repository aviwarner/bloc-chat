(function() {
  function AuthModalCtrl($uibModalInstance, $uibModal, $scope, $cookies, Auth) {

    this.authService = Auth;
    this.signedInUser = this.authService.authObj.$getAuth();

    this.cancel = function() {
      $uibModalInstance.dismiss('Cancel');
    }

    this.login = function(email, password) {
      Auth.login(email, password);
      // setTimeout(function() {
      //   if (Auth.error === "") {
      //     $uibModalInstance.close('Closed it!')
      //   }
      // }, 1000);
      $scope.$on('loggedIn', function(){
        $uibModalInstance.close()
      });
    }

    this.ok = function() {
      if ($scope.username) {
        $cookies.put('blocChatCurrentUser', $scope.username);
        $uibModalInstance.close();
      }
    }

    // open create user modal
    this.userCreate = function() {
      $uibModalInstance.dismiss('cancel');
      var modal = $uibModal.open({
        templateUrl: '/templates/user-create-modal.html',
        controller: 'AuthModalCtrl',
        controllerAs: 'auth',
        size: 'sm',
        animation: false
      });
    }

  }

  angular
    .module('blocChat')
    .controller('AuthModalCtrl', ['$uibModalInstance', '$uibModal', '$scope', '$cookies', 'Auth', AuthModalCtrl]);
})();

(function() {
  function AuthModalCtrl($uibModalInstance, $uibModal, $scope, $cookies, Auth) {

    this.authService = Auth;

    this.cancel = function() {
      $uibModalInstance.dismiss('Cancel');
    }

    this.login = function(email, password) {
      this.authService.login(email, password);
      console.log($cookies.get('blocChatCurrentUser'));
      // if (!this.authService.error) {
      //   $uibModalInstance.close('logged in');
      // }
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

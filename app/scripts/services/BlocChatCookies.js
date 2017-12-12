(function() {
  function BlocChatCookies($cookies, $uibModal) {
    var currentUser = $cookies.get('blocChatCurrentUser');

    if (!currentUser || currentUser === '') {
      console.log('theres no currentuser');
      $uibModal.open({
        templateUrl: '/templates/login-modal.html',
        controller: 'AuthModalCtrl',
        controllerAs: 'auth',
        size: 'sm',
        backdrop: 'static',
        keyboard: false,
        animation: false
      });
    }

  }

  angular
    .module('blocChat')
    .run(['$cookies', '$uibModal', BlocChatCookies])
})();

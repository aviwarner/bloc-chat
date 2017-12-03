(function() {
  function BlocChatCookies($cookies, $uibModal) {
    var currentUser = $cookies.get('blocChatCurrentUser');

    if (!currentUser || currentUser === '') {
      console.log('theres no currentuser');
      $uibModal.open({
        templateUrl: '/templates/new-user-modal.html',
        controller: 'NewUserModalCtrl',
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

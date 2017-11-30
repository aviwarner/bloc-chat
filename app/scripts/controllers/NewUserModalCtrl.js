(function() {
  function NewUserModalCtrl($scope, $cookies, $uibModalInstance) {

    $scope.ok = function() {
      if ($scope.username) {
        $cookies.put('blocChatCurrentUser', $scope.username);
        $uibModalInstance.close();
      }
    }

  }

  angular
    .module('blocChat')
    .controller('NewUserModalCtrl', ['$scope', '$cookies', '$uibModalInstance', NewUserModalCtrl]);
})();

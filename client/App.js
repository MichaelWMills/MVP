console.log('Hello World!');

angular.module('rocketApp', [])

  .controller('rocketController', function ($scope) {

    $scope.myRockets = [];

    $scope.rocket.fullMass = 0;
    $scope.rocket.emptyMass = 0;
    $scope.rocket.engineISP = 0;

    $scope.rocket.deltav = null;

    $scope.calculate = function() {
      if ($scope.rocket.fullMass > 0 && $scope.rocket.emptyMass > 0 && $scope.rocket.engineISP > 0) {
        $scope.rocket.deltav = $scope.rocket.engineISP * 9.8 * Math.log($scope.rocket.fullMass / $scope.rocket.emptyMass);
      }
    };

});
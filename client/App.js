angular.module('rocketApp', [])

  .controller('rocketController', function ($scope, $http) {

    $scope.myRockets = [];

    $scope.rocket.name = '';
    $scope.rocket.fullMass = 0;
    $scope.rocket.dryMass = 0;
    $scope.rocket.engineISP = 0;

    $scope.rocket.deltav = 0;

    $scope.getAllRockets = function() {
      console.log('getAllRockets was called');
      $http({
        method:'GET',
        url:'/rocketList'
      })
      .then(function(rockets) {
        console.log('Rockets retrieved successfully');
        rockets.data.forEach(function(rocket) {
          $scope.myRockets.push(rocket);
        });
      });
    };

    $scope.addRocket = function(rocket) {
      console.log('addRocket was called');
      $http({
        method:'POST',
        url:'/rocketList',
        data: rocket
      })
      .then(function() {
        console.log('Added rocket successfully');
        $scope.getAllRockets();
      });
    };

    $scope.calculate = function() {
      if ($scope.rocket.fullMass > 0 && $scope.rocket.dryMass > 0 && $scope.rocket.engineISP > 0) {
        $scope.rocket.deltav = $scope.rocket.engineISP * 9.8 * Math.log($scope.rocket.fullMass / $scope.rocket.dryMass);
        $scope.rocket.deltav = $scope.rocket.deltav.toFixed(2);
      }
      var myRocket = {
        'model': $scope.rocket.name,
        'engineisp': $scope.rocket.engineISP,
        'fullmass': $scope.rocket.fullMass,
        'drymass': $scope.rocket.dryMass,
        'deltav': $scope.rocket.deltav
      };

      $scope.addRocket(myRocket);
    };

});
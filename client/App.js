angular.module('rocketApp', [])

  .controller('rocketController', function ($scope, $http) {

    $scope.myRockets = [];

    $scope.rocket.model = '';
    $scope.rocket.fullmass = 0;
    $scope.rocket.drymass = 0;
    $scope.rocket.engineisp = 0;

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
          //console.log(rocket);
          $scope.myRockets.push(rocket);
        });
      });
    };

    $scope.getAllRockets();

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
      if ($scope.rocket.fullmass > 0 && $scope.rocket.drymass > 0 && $scope.rocket.engineisp > 0) {
        $scope.rocket.deltav = $scope.rocket.engineisp * 9.8 * Math.log($scope.rocket.fullmass / $scope.rocket.drymass);
        $scope.rocket.deltav = $scope.rocket.deltav.toFixed(2);
      }
      var myRocket = {
        'model': $scope.rocket.model,
        'engineisp': $scope.rocket.engineisp,
        'fullmass': $scope.rocket.fullmass,
        'drymass': $scope.rocket.drymass,
        'deltav': $scope.rocket.deltav
      };

      console.log(myRocket);

      $scope.addRocket(myRocket);
    };

});
angular.module('rocketApp', [])

  .controller('rocketController', function ($scope, $http) {

    $scope.myRockets = [];

    $scope.rocket.model = '';
    $scope.rocket.fullmass = 0;
    $scope.rocket.drymass = 0;
    $scope.rocket.engineisp = 0;

    $scope.rocket.deltav = 0;

    $scope.rocket.where = '';

    $scope.getAllRockets = function() {
      $http({
        method:'GET',
        url:'/rocketList'
      })
      .then(function(rockets) {
        console.log(rockets.data);
        // rockets.data.forEach(function(rocket) {
        //   $scope.myRockets.push(rocket);
        // });
        $scope.myRockets = rockets.data;
      });
    };

    $scope.addRocket = function(rocket) {
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

      //functionality to be used later in development
      //myRocket.where = myRocket.deltav > 10000 ? 'Your rocket can reach the moon!' : 'Your rocket can\'t reach the moon.';

      $scope.addRocket(myRocket);
    };

    $scope.clearHistory = function() {
      $http({
        method:'DELETE',
        url:'/rocketList'
      })
      .then(function() {
        $scope.myRockets = [];
        console.log('History successfully deleted');
      });
    };

});
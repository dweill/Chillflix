const app = angular.module('app', []);
app.controller('MovieCTRL', function($scope, Random) {
  $scope.clicked = false;
  $scope.movies = [
    { title: 'The Cable Guy' },
    { title: 'Dumb and Dumber' },
    { title: 'Gladiator' },
    { title: 'Ravenous' },
    { title: 'Attack on Titan' },
    { title: 'Barton Fink' },
    { title: 'Donnie Darko' },
    { title: 'Johnny Mnemonic' },
    { title: 'Zodiac' },
  ];
  $scope.rando = () => {
    let i = Math.floor(Math.random() * ($scope.movies.length));
    return i;
  };
  $scope.search = () => {
    Random.search($scope.movies[$scope.rando()].title, (data) => {
      $scope.current = data.data.show_title;
      $scope.image = data.data.poster;
    });
  };
  $scope.search();
});


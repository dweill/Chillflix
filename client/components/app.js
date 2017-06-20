const app = angular.module('app', []);
app.controller('MovieCTRL', function($scope, Random) {
  $scope.movies = [
    { title: 'The Cable Guy' },
    { title: 'Dumb and Dumber' },
    { title: 'Gladiator' },
    { title: 'Ravenous' },
  ];
  $scope.rando = () => {
    let i = Math.floor(Math.random() * ($scope.movies.length));
    return i;
  };
  $scope.search = Random.search($scope.movies[$scope.rando()].title, (data) => {
    console.log(data.data.show_title);
  });
});


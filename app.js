const app = angular.module('app', []);
app.controller('MovieCTRL', ($scope, random) => {
  $scope.movies = [
    { title: 'The Cable Guy' },
    { title: 'Dumb and Dumber' },
    { title: 'Gladiator' },
    { title: 'Ravenous' },
  ];
  let i = Math.floor(Math.random() * ($scope.movies.length - 1));
  random.search($scope.movies[i]);
});


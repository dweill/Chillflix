const app = angular.module('app', []);
app.controller('MovieCTRL', ($scope) => {
  $scope.movies = [
    { title: 'The Cable Guy' },
    { title: 'Dumb and Dumber' },
    { title: 'Gladiator' },
    { title: 'Ravenous' },
  ];
});


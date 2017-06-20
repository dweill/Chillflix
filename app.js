const app = angular.module('app', []);
app.controller('MovieCTRL', function MovieCTRL($scope) {
  $scope.movies = [{ title: 'Baby\'s Day Out' }, { title: 'Cop Dog' }];
});


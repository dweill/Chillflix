const app = angular.module('app', []);
app.controller('MovieCTRL', function($scope, $http, Random) {
  $scope.clicked = false;
  // $scope.userMovies = [];
  // $scope.unwatch =[];
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
  // $scope.unwatch.push($http.get('/user').then((data) => {
  //   console.log(data, 'data');
  // }));
  // $scope.movieFitler = $scope.movies.filter((val) => {
  //   if (!$scope.unwatch.includes(val)) {
  //     $scope.userMovies.push(val);
  //     console.log($scope.userMovies);
  //   }
  // });
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
  // $scope.search();
  $scope.update = () => {
    console.log('hit');
    Random.update($scope.current, (data) => {
      console.log(data, 'its me');
    });
  };
});


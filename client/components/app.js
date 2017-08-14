const app = angular.module('app', []);
app.controller('MovieCTRL', function($scope, $http, Random) {
  $scope.getUser = () => {
    Random.getUser((data) => {
      $scope.user = data;
      $scope.unwatchable = data.unwatchable;
    });
  };
  $scope.getUser();
  $scope.movies = [
    { title: 'The Cable Guy' },
    { title: 'Dumb and Dumber' },
    { title: 'Ravenous' },
    { title: 'Attack on Titan' },
    { title: 'Barton Fink' },
    { title: 'Zodiac' },
    { title: 'Man of Tai Chi' },
    { title: 'The Gift' },
    { title: 'Little Buddha' },
    { title: 'Sunset Strip' },
    { title: 'Generation Um...' },
    { title: 'Side By Side' },
    { title: 'Devil in a Blue Dress' },
    { title: 'Flight' },
    { title: 'Hard Lessons' },
    { title: 'The Manchurian Candidate' },
    { title: 'Philadelphia' },
    { title: 'Out of Time' },
    { title: 'Valkyrie' },
    { title: 'Vanilla Sky' },
    { title: 'Jack Reacher' },
    { title: 'Mission: Impossible II' },
    { title: 'Days of Thunder' },
    { title: 'The Firm' },
    { title: 'Rain Man' },
    { title: 'Jerry Maguire' },
    { title: 'Forrest Gump' },
    { title: 'The Man with One Red Shoe' },
    { title: 'The Burbs' },
    { title: 'Sleepless in Seattle' },
    { title: 'Cast Away' },
    { title: 'Ali' },
    { title: 'Bad Boys II' },
    { title: 'Amistad' },
    { title: 'Edison Force' },
    { title: 'The Last White Knight' },
    { title: 'The Sum of All Fears' },
    { title: 'Along Came a Spider' },
    { title: 'Olympus Has Fallen' },
    { title: 'Fight For Life' },
    { title: 'The Magic of Belle Isle' },
    { title: 'The Code' },
    { title: 'Seven' },
    { title: 'Hard Rain' },
    { title: 'Breaking the Taboo' },
    { title: 'Bruce Almighty' },
    { title: 'Deep Impact' },
    { title: 'The Glass Shield' },
    { title: 'Are We There Yet?' },
    { title: 'Rampart' },
    { title: 'XXX: State of the Union' },
    { title: 'Barbershop' },
    { title: 'Anaconda' },
    { title: 'Barbershop 2: Back in Business' },
    { title: 'Zoolander' },
    { title: 'Casa de mi Padre' },
    { title: 'Jay and Silent Bob Strike Back' },
    { title: 'Bewitched' },
    { title: 'Anchorman 2: The Legend Continues' },
    { title: 'The Ladies Man' },
    { title: 'Dead Man Down' },
    { title: 'In Bruges' },
    { title: 'The Way Back' },
    { title: 'The Fifth Element' },
    { title: 'Pulp Fiction' },
    { title: 'Fire with Fire' },
    { title: 'The Whole Nine Yards' },
  ];
  $scope.rando = () => {
    let i = Math.floor(Math.random() * ($scope.movies.length));
    return i;
  };
  $scope.search = async () => {
    if ($scope.unwatchable.length >= $scope.movies.length) {
      $scope.current = 'You Hate Everything';
      $scope.image = null;
      return;
    }
    Random.search($scope.movies[$scope.rando()].title, (data) => {
      if ($scope.unwatchable.includes(data.data.show_title)) {
        return $scope.search();
      } else {
        $scope.current = data.data.show_title;
        $scope.image = data.data.poster;
      }
    });
  };
  $scope.update = async () => {
    if ($scope.current === 'You Hate Everything') {
      return;
    }
    if ($scope.unwatchable.indexOf($scope.current) > -1) {
      $scope.search();
    } else {
      $scope.unwatchable.push($scope.current);
      await Random.update($scope.current, (data) => {
        console.log(data);
      });
      $scope.search();
    }
  };
});


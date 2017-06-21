angular.module('app')
.service('Random', function($window, $http) {
  return {
    search: (query, callback) => {
      $http.get('//netflixroulette.net/api/api.php?', {
        params: {
          title: query,
        },
      }).then((data) => {
        callback(data);
      }, (error) => {
        console.error(error);
      });
    },
  };
});

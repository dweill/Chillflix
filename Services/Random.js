angular.module('app')
.service('random', ($window, $http) => {
  return {
    search: (query, callback) => {
      $http.get('http://netflixroulette.net/api/api.php?', {
        params: {
          q: query,
        },
      }).then((data) => {
        callback(data);
      }, (error) => {
        console.error(error);
      });
    },
  };
});

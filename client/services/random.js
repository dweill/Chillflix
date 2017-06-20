angular.module('app')
.service('Random', function($window, $http) {
  return {
    search: function(query, callback) {
      $http.get('http://netflixroulette.net/api/api.php?', {
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

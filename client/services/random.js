angular.module('app')
.service('Random', function($window, $http) {
  return {
    search: (query, callback) => {
      $http.get('https://netflixroulette.net/api/api.php?', {
        params: {
          title: query,
        },
      }).then((data) => {
        callback(data);
      }, (error) => {
        console.error(error);
      });
    },
    update: (query, callback) => {
      console.log(query, 'q');
      $http.put(`/hate/${query}`, {
        params: {
          unwatchable: query,
        },
      }).then((data) => {
        callback(data);
      }, (err) => {
        console.error(err);
      });
    },
  };
});

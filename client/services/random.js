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
      $http.put(`/hate/${query}`, {
        config: {
          data: query,
        },
      }).then((data) => {
        callback(data);
      }, (err) => {
        console.error(err);
      });
    },
    getUser: (callback) => {
      $http.get('/user').then((data) => {
        callback(data.data[0]);
      });
    },
  };
});

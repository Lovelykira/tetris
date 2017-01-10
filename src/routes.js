angular
  .module('app')
  .config(routesConfig)
  .constant('BACKGROUND_COLOR', 'white')
  .constant('FILL_COLOR', 'black')
  .constant('ACTIVE_COLOR', 'red');

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('tetris', {
      url: '/',
      controller: 'tetrisController',
      controllerAs: 'vm',
      templateUrl: 'app/tetris/tetris.html'
    })
    .state('beat', {
      url: '/2',
      controller: 'beatController',
      controllerAs: 'vm',
      templateUrl: 'app/beat_game/beat_game.html'
    })
    .state('tamagochi', {
      url: '/3',
      controller: 'tamagochiController',
      controllerAs: 'vm',
      templateUrl: 'app/tamagochi/tamagochi.html'
    });

}

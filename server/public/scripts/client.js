var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider, $mdGestureProvider) {
  $mdGestureProvider.skipClickHijack();
  $locationProvider.hashPrefix('');
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('amber')
    .warnPalette('red');
});

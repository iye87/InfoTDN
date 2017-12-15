// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.noticias', {
      url: '/noticias',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias.html',
          controller: 'NoticiasCtrl'
        }
      }
    })
    .state('app.locales', {
      url: '/locales',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias_locales.html',
          controller: 'NoticiasLocalesCtrl'
        }
      }
    })
    .state('app.internacionales', {
      url: '/internacionales',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias_internacionales.html',
          controller: 'NoticiasInternacionalesCtrl'
        }
      }
    }).state('app.nacionales', {
      url: '/nacionales',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias_nacionales.html',
          controller: 'NoticiasNacionalesCtrl'
        }
      }
    }).state('app.economicas', {
      url: '/economicas',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias_economia.html',
          controller: 'NoticiasEconomicasCtrl'
        }
      }
    }).state('app.opinion', {
      url: '/opinion',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias_opinion.html',
          controller: 'NoticiasOpinionCtrl'
        }
      }
    }).state('app.tvenvivo', {
      url: '/tvenvivo',
      views: {
        'menuContent': {
          templateUrl: 'templates/tv_en_vivo.html',
          controller: 'TvenVivoCtrl'
        }
      }
    }).state('app.tvterrenas', {
      url: '/tvterrenas',
      views: {
        'menuContent': {
          templateUrl: 'templates/tv_lasterrenas.html',
          controller: 'TvTerrenasCtrl'
        }
      }
    }).state('app.tv56', {
      url: '/tv56',
      views: {
        'menuContent': {
          templateUrl: 'templates/tv_56.html',
          controller: 'Tv56Ctrl'
        }
      }
    }).state('app.tvclc', {
      url: '/tvclc',
      views: {
        'menuContent': {
          templateUrl: 'templates/tv_clc.html',
          controller: 'TvClcCtrl'
        }
      }
    }).state('app.radiovivo', {
      url: '/radiovivo',
      views: {
        'menuContent': {
          templateUrl: 'templates/radio_en_vivo.html',
          controller: 'RadioenVivoCtrl'
        }
      }
    })
    .state('app.deportes', {
      url: '/deportes',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticias_deportes.html',
          controller: 'NoticiasDeportivasCtrl'
        }
      }
    })
    .state('app.noticia', {
      url: '/noticias/:noticiaId',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticia.html',
          controller: 'NoticiaCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/noticias');
});

function loading(value){
  if(value){
    $('#loading').css("display","inline");
  }else $('#loading').css("display","none");
}


/**
 * Función para calcular el tiempo entre dos fechas.
 * d1 = "01/17/2012 11:20";
 * d2 = "01/18/2012 12:25";
 * calcularTiempoDosFechas(d1, d2);
 */
function calcularTiempoDosFechas(date1, date2){
  start_actual_time = new Date(date1);
  end_actual_time = new Date(date2);

  var diff = end_actual_time - start_actual_time;

  var diffSeconds = diff/1000;
  var HH = Math.floor(diffSeconds/3600);
  var MM = Math.floor(diffSeconds%3600)/60;

  var formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM)
  return formatted;
}

// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("386ee07f-b554-45c8-a24b-97dc580555aa", {googleProjectNumber: "686642446111"})
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);

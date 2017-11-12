angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('NoticiasCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts').success(function(data) {
    var noticias = [];    
    for (var i = 0; i < data.length; i++) {
      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': data[i].date,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered
      };      
      noticias.push(noticia);
    };
    $scope.data_noticias = noticias;
    loading(false);
}).error(function(){
  alert("Error de Conexión");
loading(false);
});


$scope.noticiaClic = function(id){      
  $location.path('app/noticias/'+id);
  localStorage.setItem('idnoticia', id);  
}

})
.controller('NoticiaCtrl', function($scope, $stateParams, $http) {
  var id = localStorage.getItem('idnoticia');
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts/'+id).success(function(data) {
        $scope.noticia = {
          'titulo': data.title.rendered,
          'img': data.better_featured_image.source_url,
          'fecha': data.date,
          'contenido': data.content.rendered
        }
        loading(false);
});
})
.controller('NoticiasLocalesCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=27').success(function(data) {
    var noticias = [];    
    for (var i = 0; i < data.length; i++) {
      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': data[i].date,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered
      };      
      noticias.push(noticia);
    };
    $scope.data_noticias = noticias;
    $scope.hr='<hr/>'
    loading(false);
   
}).error(function(){
  alert("Error de Conexión");
loading(false);
});

$scope.noticiaClic = function(id){      
  $location.path('app/noticias/'+id);
  localStorage.setItem('idnoticia', id);  
}

})
.controller('NoticiasNacionalesCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=29').success(function(data) {
    var noticias = [];    
    for (var i = 0; i < data.length; i++) {
      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': data[i].date,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered
      };      
      noticias.push(noticia);
    };
    $scope.data_noticias = noticias;
    $scope.hr='<hr/>'
    loading(false);

}).error(function(){
  alert("Error de Conexión");
loading(false);
});

$scope.noticiaClic = function(id){      
  $location.path('app/noticias/'+id);
  localStorage.setItem('idnoticia', id);  
}

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.Canal56 = function(){
    var videoUrl = "http://ss6.domint.net:2068/stv_str/somostv/playlist.m3u8";
    
      // Just play a video
      window.plugins.streamingMedia.playVideo(videoUrl);
      
      // Play a video with callbacks
      var options = {
        successCallback: function() {
          console.log("Video was closed without error.");
        },
        errorCallback: function(errMsg) {
          console.log("Error! " + errMsg);
        }
      };
      window.plugins.streamingMedia.playVideo(videoUrl, options);
  }
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
  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500,
  }

  $scope.canales = function(canal){
    switch(canal){
      case 1: $location.path('app/tvenvivo')
      break;
      case 2: $location.path('app/tv56')
      break;
      case 3: $location.path('app/tvclc')
      break;
      case 4: $location.path('app/tvterrenas')
      break;
      case 5: $location.path('app/radiovivo')
      break;

    }
  }

  $http.get('http://infotdn.com/wp-json/wp/v2/posts/?per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
  var id = localStorage.getItem('idnoticia');var fecha = "";
  var fecha = "";
  var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var comentarios = [];
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts/'+id).success(function(data) {

    fecha = data.date.replace("T", "-");
    fecha = fecha.split("-", 3);    
    fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];

        $scope.noticia = {
          'titulo': data.title.rendered,
          'img': data.better_featured_image.source_url,
          'fecha': fecha,
          'contenido': data.content.rendered,
          'link': data.guid.rendered
        }
        loading(false);
});

$http.get('http://infotdn.com/wp-json/wp/v2/comments?post='+id).success(function(data) {
  $scope.cant_comentarios = data.length;

  for (var i = 0; i < data.length; i++) {
    fecha = data[i].date.replace("T", "-");
    fecha = fecha.split("-", 3);    
    fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];

    var comentario = {
      'autor': data[i].author_name,
      'fecha': fecha,
      'contenido': data[i].content.rendered
    };    

    comentarios.push(comentario);
  };
  $scope.data_comentarios = comentarios;
  
});

$scope.compartir = function(link){
  window.plugins.socialsharing.share(null, null, null, link);
}

})
.controller('NoticiasLocalesCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=27&per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=29&per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
.controller('NoticiasInternacionalesCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=26&per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
.controller('NoticiasDeportivasCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=25&per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
.controller('NoticiasEconomicasCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=28&per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
.controller('NoticiasOpinionCtrl', function($scope, $stateParams, $http, $location) {
  loading(true);
  $http.get('http://infotdn.com/wp-json/wp/v2/posts?categories=19&per_page=30').success(function(data) {
    var noticias = [];  
    var categoria = "";  
    var fecha = "";
    var MONTH_NAMES = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

    for (var i = 0; i < data.length; i++) {
      fecha = data[i].date.replace("T", "-");
      fecha = fecha.split("-", 3);
      
      fecha = fecha[2] + " " + MONTH_NAMES[fecha[1]-1] + " " + fecha[0];


      switch(data[i].categories[0]){
        case 27: categoria = "Locales"
        break;
        case 29: categoria = "Nacionales"
        break;
        case 26: categoria = "Internacionales"
        break;
        case 25: categoria = "Deportes"
        break;
        case 19: categoria = "Opinion"
        break;
        case 28: categoria = "Economía"
        break;
      }

      var noticia = {
        'id': data[i].id,
        'titulo': data[i].title.rendered,
        'img': data[i].better_featured_image.source_url,
        'fecha': fecha,
        'contenido': data[i].content.rendered,
        'fragmento':data[i].excerpt.rendered,
        'categoria':categoria
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
.controller('TvenVivoCtrl', function($scope, $stateParams) {
})
.controller('TvTerrenasCtrl', function($scope, $stateParams) {
})
.controller('Tv56Ctrl', function($scope, $stateParams) {
})
.controller('TvClcCtrl', function($scope, $stateParams) {
})
.controller('RadioenVivoCtrl', function($scope, $stateParams) {

$scope.img_pause = true;
$scope.img_play = false;

$scope.media = new Audio();
$scope.media.src = "http://radio1.domint.net:8042/;stream.mp3";

$scope.play = function(){
  $scope.media.load();
  $scope.media.play();
  $scope.img_play=true;
  $scope.img_pause = false;
}

$scope.pause = function(){
  $scope.media.pause();
  $scope.img_pause = true;
  $scope.img_play = false;  
}



})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});



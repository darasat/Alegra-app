angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, AlegraService) {

  // Creamos la modal que usaremos enseguida
  $ionicModal.fromTemplateUrl('templates/agregar-contacto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Cerrar la modal
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Abrir la modal
  $scope.openModal = function() {
    $scope.modal.show();
  };

  
    $scope.new = {}; 
      $scope.guardarContacto = function(){
    AlegraService.GuardarContacto($scope.new).then(function(msg) {
      console.log(msg);
      $scope.new = {};
   
    });
  };
})



// A simple controller that fetches a list of data from a service
.controller('AlegraCtrl', function($scope, $stateParams, $ionicPopup, AlegraService) {
  // 
 // $scope.newContactos = [];
  $scope.contactos = [];
  
  
  $scope.obtenerContactos = function() {
       AlegraService.all().then(function (respuesta) { 
      $scope.contactos = respuesta.data;
	  
		$scope.$broadcast('scroll.infiniteScrollComplete');
   
    }, function(error){
      alert(error);
    });
	
  }
  
    
  
	  $scope.doRefresh = function() {
    AlegraService.GetNewUsers().then(function(contactos) {

	 $scope.contactos =contactos;
				
	  
  //Stop the ion-refresher from spinning
	$scope.$broadcast('scroll.refreshComplete');
    }
	
	, function(error){
      alert(error);
    });
 
		
  };
  
  //si queremos ver los ultimos 30 usuarios
  $scope.loadMore = function(){
    AlegraService.GetOldUsers().then(function(contactos) {

	 $scope.contactos =contactos;
				
	  
     $scope.$broadcast('scroll.infiniteScrollComplete');
	 
    }, function(error){
      alert(error);
    });
  };
  
    $scope.moveItem = function(item, fromIndex, toIndex) {
	
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(id) {
		
  var confirmPopup = $ionicPopup.confirm({
       title: 'Eliminar',
       template: '¿Seguro que deseas eliminar el contacto seleccionado?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         AlegraService.eliminarContacto(id).
         then(function(response){
           afirmativa();
		   $scope.contactos =contactos;
	       $scope.contactos.splice($scope.contactos.indexOf(contacto), 1);
           $scope.$broadcast('scroll.infiniteScrollComplete');
         })
         .catch(function(err){
          console.log(err)
         })
       } else {
         negativa();
       }
     });

  }
  
    var afirmativa = function(){

     var alertPopup = $ionicPopup.alert({
       title: 'OK',
       template: 'El contacto fue eliminado correctamente.'
     });
     alertPopup.then(function(res) {
      //console.log ("se ha eliminado");
     });
   
  }

  var negativa = function(){
     var alertPopup = $ionicPopup.alert({
       title: 'ERROR',
       template: 'Ocurrio un problema al intentar eliminar al contacto.'
     });
     alertPopup.then(function(res) {
      // console.log ("no se ha eliminado");
     });
   
  }
  
  
})



//controlador que sirve para mostrar los detalles del contacto 
.controller('DetalleContactoCtrl', function($scope, $stateParams, AlegraService) {

$scope.obtenerContacto = function() {
	  //alert ($stateParams.contactoId);

        AlegraService.obtenerContactoId($stateParams.contactoId).
         then(function(response){
         //alert (response);
		console.log ("exito");
      $scope.contacto =  response;
    }, function(error){
      alert(error);
    });
	
  }
    
})




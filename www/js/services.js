angular.module('starter.services', [])

/**
 * Un servicio que conecta a Alegra API.
 */
.service('AlegraService', function($http) {
	
	var URL = 'https://app.alegra.com/api/v1/contacts/';
    var config = {
      'headers': {
        'accept' : 'application/json',
        'content-type' : 'application/json',
        'Authorization': 'Basic ' + 'REEMPLAZAR AQUI CON EL TOKEN DE AUTENTICACION EN BASE 64'
      }
    }
	
 
  return {
    all: function() {
      return $http.get(URL, config);
    },
    obtenerContactoId: function(id) {
     	    return $http.get(URL +id , config).then(function(response){
		contacto = response.data;
		return contacto;
		});
    }, 
	GetNewUsers: function(){
			return $http.get(URL + '?limit=10' , config).then(function(response){
				contactos = response.data;
				return contactos;
			});
	},
	GetOldUsers: function(){
			return $http.get(URL + '?limit=30', config ).then(function(response){
				contactos = response.data;
				return contactos;
			});
		},
	GuardarContacto: function (NewContact){
		return $http.post(URL, NewContact, config).then(function(response) {
        var ContactNew = response.data;
        return ContactNew;
      })
	},
	eliminarContacto : function (id){
	    return $http.delete(URL +id , config).then(function(response){
		contacto = response.data;
		return contacto;
		});
	}
  }
})
'use strict';

angular.module('myApp.main', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'main/main.html',
      controller: 'MainController'
    });
  }])

  .controller('MainController', function ($scope, Restangular, $mdToast, leafletData) {
    $scope.center = {
      lat: -23.5475,
      lng: -46.63611,
      zoom: 5
    };
    $scope.markers = {};
    $scope.deliveries = [];
    $scope.cliente = {};

    function init() {
      atualizaLista();
    }

    function toaster(msg) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position("top right")
        .hideDelay(3000))
      .then(function() {
      }).catch(function() {
      });
    }

    function atualizaLista() {
      Restangular.all('deliveries').getList({}).then(function (deliveries) {
        $scope.deliveries = deliveries;
        atualizaMarkers($scope.deliveries);
      });
    }

    function atualizaMarkers(deliveries) {
      $scope.markers = {};
      angular.forEach(deliveries, function (delivery) {
        $scope.markers[delivery.cliente] = {
          lat: delivery.endereco.geolocalizacao[0],
          lng: delivery.endereco.geolocalizacao[1],
          focus: true,
          message: `${delivery.cliente}<br>${delivery.peso}kg`
        };
      });
    }

    $scope.resetarCliente = function () {
      Restangular.all('deliveries').remove().then(function () {
        atualizaLista();
        toaster("Clientes Resetados com sucesso!");
      });
    };

    $scope.salvar = function (cliente) {
      Restangular.all('deliveries').post(cliente).then(function () {
        atualizaLista();
        $scope.center = {
          lat: cliente.endereco.geolocalizacao[0],
          lng: cliente.endereco.geolocalizacao[1],
          zoom: 1
        };
        toaster("Cliente cadastrado com sucesso!");
      }).catch(function (error) {
        if (error.data.errors && error.data.errors.endereco)
          toaster(error.data.errors.endereco.message);
      });
    };

    init();
});
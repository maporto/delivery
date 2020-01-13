'use strict';

angular.module('myApp.components').component('clienteForm', {
    templateUrl: 'components/cliente-form/cliente-form.html',
    bindings: {
        cliente: '=',
        submit: '<'
    },
    controller: function ($q) {
        var $ctrl = this;
        var geocoder = new google.maps.Geocoder();

        $ctrl.submitForm = function (cliente) {
            return $ctrl.submit(cliente);
        }

        function findGeocode(text) {
            return $q(function(resolve, reject) {
                if (text.length >= 3) {
                    geocoder.geocode({
                        'address': text
                    }, function (results, status) {
                        resolve(results);
                    });
                }
                else{
                    resolve([]);
                }
            });
        }

        $ctrl.enderecoSelecionado = function (item) {
            if (! $ctrl.cliente.endereco) {
                $ctrl.cliente.endereco = {};
            }

            $ctrl.cliente.endereco.numero = buscaNamePorTipo(item.address_components, "street_number");
            $ctrl.cliente.endereco.logradouro = buscaNamePorTipo(item.address_components, "route");
            $ctrl.cliente.endereco.bairro = buscaNamePorTipo(item.address_components, "administrative_area_level_4");
            $ctrl.cliente.endereco.bairro = $ctrl.cliente.endereco.bairro ? $ctrl.cliente.endereco.bairro : buscaNamePorTipo(item.address_components, "sublocality");
            $ctrl.cliente.endereco.bairro = $ctrl.cliente.endereco.bairro ? $ctrl.cliente.endereco.bairro : buscaNamePorTipo(item.address_components, "sublocality_level_1");
            $ctrl.cliente.endereco.complemento = "complemento";
            $ctrl.cliente.endereco.cidade = buscaNamePorTipo(item.address_components, "administrative_area_level_2");
            $ctrl.cliente.endereco.estado = buscaNamePorTipo(item.address_components, "administrative_area_level_1");
            $ctrl.cliente.endereco.pais = buscaNamePorTipo(item.address_components, "country");
            $ctrl.cliente.endereco.geolocalizacao = [];
            $ctrl.cliente.endereco.geolocalizacao[0] = item.geometry.location.lat();
            $ctrl.cliente.endereco.geolocalizacao[1] = item.geometry.location.lng();;
        }

        function buscaNamePorTipo(components, tipo) {
            var elemento;

            components.forEach(element => {
                if (element.types.indexOf(tipo) >= 0) {
                    elemento = element;
                }
            });

            return elemento ? elemento.long_name : null;
        }

        $ctrl.query = function (text) {
            return findGeocode(text);
        };
    },
  });
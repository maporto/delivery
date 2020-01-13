'use strict';

angular.module('myApp.components').component('geocoder', {
    templateUrl: 'components/geocoder/geocoder.html',
    controller: function ($q) {
        var $ctrl = this;
        var geocoder = new google.maps.Geocoder();
        $ctrl.active = 0;
        $ctrl.results = [];
        $ctrl.status = 'OK';
        $ctrl.is_visible = false;
        $ctrl.set_active = function (index) {$ctrl.active = index;};
        $ctrl.img_path = 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png';

        function findGeocode(text) {
            return $q(function(resolve, reject) {
                if (text.length >= 3) {
                    geocoder.geocode({
                        'address': text,
                        componentRestrictions: {
                        },
                    }, function (results, status) {
                            resolve(results);
                        });
                }
                else{
                    resolve([]);
                }
            });
        }

        $ctrl.get_results = function (text) {
            return findGeocode(text);
        };
    },
  });

// 'use strict';
// angular.module('myApp.components').directive('geocoder', function() {
//     return {
//       restrict: 'E',
//       replace: true,
//       templateUrl: 'components/geocoder/geocoder.html',
//       scope: {city:'=', placeholder:'='},
//       link: function($scope, element, attrs){

//             var geocoder = new google.maps.Geocoder();
//             $scope.active = 0;
//             $scope.results = [];
//             $scope.status = 'OK';
//             $scope.is_visible = false;
//             $scope.set_active = function (index) {$scope.active = index;};
//             $scope.img_path = 'https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png';


//             function findGeocode(text) {
//                 return $q(function(resolve, reject) {
//                     if (text.length >= 3) {
//                         geocoder.geocode({
//                             'address': text,
//                             componentRestrictions: {
//                             },
//                         }, function (results, status) {
//                                 resolve(results);
//                             });
//                     }
//                     else{
//                         resolve([]);
//                     }
//                 });
//             }

//             $scope.get_results = function (text) {
//                 return findGeocode(text);
//             };
//             $scope.reverse_location = function() {
//                 function success(pos) {
//                   var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
//                   geocoder.geocode({'location': latlng},
//                     function (results, status) {
//                         var r = get_chunk(results, 'locality');
//                         $scope.city = serialize_loc(r);
//                         $scope.address = r.formatted_address;
//                         $scope.$apply();
//                     });
//                 }
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(success);
//                 }
//                 else {
//                     console.log("Geolocation is not supported by your browser.");
//                 }

//             };
//             $scope.input_blur = function(){
//                 if($scope.city){ $scope.results.length = 0 }
//                 $scope.is_visible = false;
//             };
//             $scope.select_item = function (index) {
//                 if ($scope.results.length > 0) {
//                     $scope.city = serialize_loc($scope.results[index]);
//                     $scope.address = $scope.results[index].formatted_address;
//                     $scope.results.length = 0;
//                 }
//             };
//             function remove_obj_prop(obj){
//               for(var i=1; i < arguments.length; i++){
//                 if(arguments[i] in obj){ delete obj[arguments[i]]}
//               }
//             }
//             function get_chunk(arr, seek){
//                 function filter_by(value) {
//                     return value.types[0] == seek || value.types[1] == seek;
//                 }
//                 var fil = arr.filter(filter_by)[0];
//                 if(fil.types[0] !='country'){ delete fil.short_name }
//                 var chunk = {};
//                 for(var key in fil){
//                   if(key !='types'){ chunk[key] = fil[key] }
//                 }
//                 return chunk;
//             }
//             function serialize_loc(loc) {
//                 var addresses = loc.address_components;
//                 var city = get_chunk(addresses, 'locality');
//                 city.region = get_chunk(addresses, 'administrative_area_level_1');
//                 city.region.country = get_chunk(addresses, 'country');
//                 city.longitude = loc.geometry.location.lng();
//                 city.latitude = loc.geometry.location.lat();
//                 return city;
//             }
//         },
//     };
//   });
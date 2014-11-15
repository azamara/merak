angular.module('starter.controllers', [])
  .controller('MainCtrl', function ($rootScope, $scope, $ionicPopup, Beacon, beaconService) {
    var beacon = new Beacon({
      name: 'Beacon',
      uuid: 'EA95C81B-AA91-47E9-83AD-53ED4C3B4B9F',
      major: 1,
      minor: 1
    });
    $rootScope.isSearchBeacon = false;
    $scope.currentDate = new Date();
    $scope.currentBeacon = beacon;


    $scope.startSearchBeacon = function () {
      if ($scope.$root.beaconState) {
        $ionicPopup.alert({
          title: '가상 비콘이 활성화된 경우 비콘 검색을 할 수 없습니다.'
        });
        return false;
      }
      $scope.$root.isSearchBeacon = true;
      beaconService.startScanningBeacon(beacon, function (beacons) {
        $scope.beacons = beacons;
        console.log($scope.beacons, $scope.beacons[0]);
        $scope.$apply();
      });
    };

    $scope.stopSearchBeacon = function () {
      $scope.$root.isSearchBeacon = false;
      beaconService.stopScanningBeacon(beacon);
    };
  })

  .controller('BeaconCtrl', function ($rootScope, $scope, $ionicPopup, Beacon, beaconService) {
    var beacon = new Beacon({
      name: 'Beacon',
      uuid: 'EA95C81B-AA91-47E9-83AD-53ED4C3B4B9F',
      major: 1,
      minor: 1
    });
    beaconService.stopScanningBeacon(beacon);
    $rootScope.isSearchBeacon = false;
    $scope.activateBeacon = function () {
      if (!$scope.$root.beacon.name) {
        $ionicPopup.alert({
          title: '비콘 이름을 입력해주세요.'
        });
        return false;
      }

      $scope.$root.beaconState = $scope.$root.beaconState ? null : 'beacon--active';

      if ($scope.$root.beaconState) {
        var beacon = new Beacon({
          name: $scope.$root.beacon.name,
          uuid: 'EA95C81B-AA91-47E9-83AD-53ED4C3B4B9F',
          major: 1,
          minor: 1
        });
        beaconService.startAdvertingBeacon(beacon);
      } else {
        beaconService.stopAdvertingBeacon();
      }
    };
  });

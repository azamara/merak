'use strict';


/* global describe, beforeEach, it, module, inject, navigator: true */
describe('Controller', function () {

  beforeEach(module('merak'));

  /**
   * Model
   */
  describe('DashCtrl', function () {
    var scope, DashCtrl, Beacon, beaconService;

    beforeEach(inject(function ($controller, _Beacon_, _beaconService_) {
      scope = {};
      Beacon = _Beacon_;
      beaconService = _beaconService_;
      DashCtrl = $controller('DashCtrl', {
        $scope: scope
      });
    }));

    it('should exist', function () {
      expect(!!DashCtrl).toBe(true);
    });

    it('비콘 객체, 검색 여부 플래그, 비콘 검색 시작/중지 함수를 가지고 있어야한다.', function () {
      expect(scope.beacon).toBeDefined();
      expect(scope.beacons instanceof Array).toBe(true);
      expect(scope.currentDate instanceof Date).toBe(true);
      expect(typeof scope.isSearchBeacon).toBe('boolean');
      expect(typeof scope.startSearchBeacon).toBe('function');
      expect(typeof scope.stopSearchBeacon).toBe('function');
    });

    it('비콘 검색 시작/중지 함수를 실행 시키면, 비콘 검색 여부 플래그가 변경되야 한다.', function () {
      scope.startSearchBeacon();
      expect(scope.isSearchBeacon).toBe(true);

      scope.stopSearchBeacon();
      expect(scope.isSearchBeacon).toBe(false);
    });
  });
});

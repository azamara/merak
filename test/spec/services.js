'use strict';


/* global describe, beforeEach, it, module, inject, navigator: true */
describe('Service', function () {

  beforeEach(module('merak'));

  /**
   * Model
   */
  describe('Model: Beacon', function () {
    var Beacon;
    beforeEach(inject(function (_Beacon_) {
      Beacon = _Beacon_;
    }));

    it('Beacon 객체 생성 및 확인', function () {
      var beacon = new Beacon();
      expect(!!Beacon).toBe(true);
      expect(typeof Beacon === 'function').toBe(true);
      expect(typeof beacon === 'object').toBe(true);
    });

    it('Beacon 생성된 객체에 값 설정', function () {
      var beacon = new Beacon({
        name: 'William',
        uuid: 'DA5336AE-2042-453A-A57F-F80DD34DFCD9',
        major: 2000,
        minor: 5
      });
      expect(beacon.uuid).toEqual('DA5336AE-2042-453A-A57F-F80DD34DFCD9');
      expect(beacon.major).toEqual(2000);
      expect(beacon.minor).toEqual(5);
      expect(beacon.name).toEqual('William');
    });
  });

  /**
   * Business Logic
   */
  describe('Service: beaconService', function () {
    var Beacon, beaconService;
    beforeEach(inject(function (_Beacon_, _beaconService_) {
      Beacon = _Beacon_;
      beaconService = _beaconService_;
    }));

    it('beaconService.startScanningBeacon()를 실행하면 주변 비콘을 검색해야 한다.', function () {
      var beacon = new Beacon({
        name: 'William',
        uuid: 'DA5336AE-2042-453A-A57F-F80DD34DFCD9',
        major: 20000,
        minor: 1
      });
      beaconService.startScanningBeacon(beacon);
    });

    it('beaconService.stopScanningBeacon()를 실행하면 주변 비콘 검색을 중지해야 한다.', function () {
      var beacon = new Beacon({
        name: 'William',
        uuid: 'DA5336AE-2042-453A-A57F-F80DD34DFCD9',
        major: 20000,
        minor: 1
      });
      beaconService.stopScanningBeacon(beacon);
    });
    it('beaconService.startAdvertingBeacon()를 실행하면 디바이스를 가상 비콘으로 만들어 신호를 보내야 한다.', function () {
      var beacon = new Beacon({
        name: 'William',
        uuid: 'DA5336AE-2042-453A-A57F-F80DD34DFCD9',
        major: 20000,
        minor: 1
      });
      beaconService.startAdvertingBeacon(beacon);
    });
    it('beaconService.stopAdvertingBeacon()를 실행하면 디바이스를 가상 비콘으로 만들어 신호를 보내는 것을 중지해야 한다.', function () {
      beaconService.stopAdvertingBeacon();
    });
  });
});

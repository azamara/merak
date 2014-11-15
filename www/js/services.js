angular.module('starter.services', [])

/**
 * Model
 */
  .factory('Beacon', function (ModelValidator) {
    function Beacon(json) {
      this.name = null;
      this.uuid = null;
      this.major = null;
      this.minor = null;
      this.rssi = null;
      this.accuracy = null;
      this.type = null;
      this.validation = [
        {name: 'name', display: 'required', rules: 'required'},
        {name: 'uuid', display: 'required', rules: 'required|min_length[36]|max_length[36]'},
        {name: 'major', display: 'number 1 ~ 66535', rules: 'required|integer|greater_than[0]|less_than[66535]'},
        {name: 'minor', display: 'number 1 ~ 66535', rules: 'required|integer|greater_than[0]|less_than[66535]'}
      ];
      this.validationErrors = [];
      angular.extend(this, json);
    }

    /**
     * Support
     * required, type, min, max, length, regex
     * @param validation
     * @returns {boolean}
     */
    Beacon.prototype.isValid = function (validation) {
      var validator = new ModelValidator(null, angular.extend(this.validation, validation));
      var isValid = validator.validate(this);
      this.validationErrors = validator.errors;
      this.validationErrors.length && console.error(this.validationErrors);
      return isValid;
    };

    return Beacon;
  })

  .factory('ModelValidator', function ($window) {
    /**
     * ModelValidator is extending FormValidator without element
     */
    var ModelValidator = $window.FormValidator;
    ModelValidator.prototype.validate = function (model) {
      this.errors = [];

      var keys = Object.keys(model);
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (this.fields.hasOwnProperty(key)) {
          var field = this.fields[key] || {};
          field.value = model[key];
          this._validateField(field);
        }
      }

      return this.errors.length <= 0;
    };
    return ModelValidator;
  })
/**
 * Business Logic
 */
  .service('beaconService', function () {
    return {
      startScanningBeacon: function (beacon, cb) {
        var delegate = new cordova.plugins.locationManager.Delegate().implement({
          didDetermineStateForRegion: function (pluginResult) {
            console.log('didDetermineStateForRegion:', pluginResult);

            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
            + JSON.stringify(pluginResult));
          },

          didStartMonitoringForRegion: function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);
          },

          didRangeBeaconsInRegion: function (pluginResult) {
            console.log('didRangeBeaconsInRegion:', pluginResult, pluginResult.beacons[0]);
            cb(pluginResult.beacons);
          }
        });
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(beacon.name, beacon.uuid,
          beacon.major, beacon.minor);

        cordova.plugins.locationManager.setDelegate(delegate);

        // required in iOS 8+
        cordova.plugins.locationManager.requestWhenInUseAuthorization();
        // or cordova.plugins.locationManager.requestAlwaysAuthorization()

        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
          .fail(console.error)
          .done();
      },
      stopScanningBeacon: function (beacon) {
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(beacon.name, beacon.uuid,
          beacon.major, beacon.minor);

        cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
          .fail(console.error)
          .done();
      },
      startAdvertingBeacon: function (beacon) {
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(beacon.name, beacon.uuid,
          beacon.major, beacon.minor);

        cordova.plugins.locationManager.isAdvertisingAvailable().then(function (isSupported) {
          if (isSupported) {
            cordova.plugins.locationManager.startAdvertising(beaconRegion)
              .fail(console.error)
              .done();
          } else {
            console.log("Advertising not supported");
          }
        }).fail(console.error).done();
      },
      stopAdvertingBeacon: function () {
        cordova.plugins.locationManager.stopAdvertising().fail(console.error).done();
      }
    }
  });

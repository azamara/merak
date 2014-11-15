window.cordova = {
  plugins: {
    locationManager: {
      Delegate: function () {
        return {
          implement: function () {
          }
        }
      },
      BeaconRegion: function (name, uuid, major, minor) {

      },
      setDelegate: function (delegate) {

      },
      requestWhenInUseAuthorization: function () {

      },
      startRangingBeaconsInRegion: function (beaconRegion) {
        return {
          fail: function (error) {
            return this;
          },
          done: function () {
            return this;
          }
        }
      },
      stopRangingBeaconsInRegion: function (beaconRegion) {
        return {
          fail: function (error) {
            return this;
          },
          done: function () {
            return this;
          }
        }
      },
      isAdvertisingAvailable: function (beaconRegion) {
        return {
          then: function(cb) {
            return this;
          },
          fail: function (error) {
            return this;
          },
          done: function () {
            return this;
          }
        }
      },
      stopAdvertising: function () {
        return {
          fail: function (error) {
            return this;
          },
          done: function () {
            return this;
          }
        }
      }
    }
  }
};
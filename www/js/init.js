(function () {
  /**
   * Extend angular.extend for deep
   * require: angular.js
   * @param dst
   * @returns {*}
   */
  angular.extend = function (dst) {
    var deep = false,
      i = 1;

    if (typeof(dst) === 'boolean') {
      deep = dst;
      dst = arguments[1] || {};
      i++;
    }

    var _obj = [].slice.call(arguments, i);

    for (var j = 0, len = _obj.length; j < len; j++) {
      var obj = _obj[j];
      var array, clone, copy, key, src;

      if (!obj) {
        continue;
      }

      var keys = Object.keys(obj);
      for (var k = 0, len2 = keys.length; k < len2; k++) {
        key = keys[k];
        src = dst[key];
        copy = obj[key];

        if (dst === copy) {
          continue;
        }

        if (deep && copy && (angular.isObject(copy) ||
          (array = angular.isArray(copy)))) {

          if (array) {
            clone = (src && angular.isArray(src)) ? src : [];
          } else {
            clone = (src && angular.isObject(src)) ? src : {};
          }

          dst[key] = angular.extend(deep, clone, copy);
        }
        else if (copy !== undefined) {
          dst[key] = copy;
        }
      }
    }

    return dst;
  }
})();
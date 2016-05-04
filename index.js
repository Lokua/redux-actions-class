/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _camelcase = __webpack_require__(1);

	var _camelcase2 = _interopRequireDefault(_camelcase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Actions = function () {
	  _createClass(Actions, null, [{
	    key: 'makeActionCreator',


	    /**
	     * @see http://redux.js.org/docs/recipes/ReducingBoilerplate.html
	     */
	    value: function makeActionCreator(type) {
	      for (var _len = arguments.length, argNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        argNames[_key - 1] = arguments[_key];
	      }

	      return function actionCreator() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        var action = { type: type };
	        argNames.forEach(function (arg, index) {
	          return action[argNames[index]] = args[index];
	        });
	        return action;
	      };
	    }
	  }]);

	  function Actions(config) {
	    var _this = this;

	    _classCallCheck(this, Actions);

	    this.types = {};
	    this.creators = {};

	    Object.keys(config).forEach(function (type) {

	      // add type to instance and instance.types for convenience
	      _this[type] = _this.types[type] = type;

	      var camelKey = (0, _camelcase2.default)(type);
	      var value = config[type];

	      // eslint-disable-next-line init-declarations
	      var creator = void 0;

	      if (Array.isArray(value)) {
	        creator = Actions.makeActionCreator.apply(Actions, [type].concat(_toConsumableArray(value)));
	      } else if (typeof value === 'string') {
	        creator = Actions.makeActionCreator(type, value);
	      } else if (typeof value === 'function') {
	        creator = value;
	      } else if (!value) {
	        creator = Actions.makeActionCreator(type);
	      }

	      // add creator to instance and instance.creators for convenience
	      _this[camelKey] = _this.creators[camelKey] = creator.bind(_this);
	    });
	  }

	  return Actions;
	}();

	exports.default = Actions;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function preserveCamelCase(str) {
		var isLastCharLower = false;

		for (var i = 0; i < str.length; i++) {
			var c = str.charAt(i);

			if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
				str = str.substr(0, i) + '-' + str.substr(i);
				isLastCharLower = false;
				i++;
			} else {
				isLastCharLower = c.toLowerCase() === c;
			}
		}

		return str;
	}

	module.exports = function () {
		var str = [].map.call(arguments, function (str) {
			return str.trim();
		}).filter(function (str) {
			return str.length;
		}).join('-');

		if (!str.length) {
			return '';
		}

		if (str.length === 1) {
			return str;
		}

		if (!/[_.\- ]+/.test(str)) {
			if (str === str.toUpperCase()) {
				return str.toLowerCase();
			}

			if (str[0] !== str[0].toLowerCase()) {
				return str[0].toLowerCase() + str.slice(1);
			}

			return str;
		}

		str = preserveCamelCase(str);

		return str.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
			return p1.toUpperCase();
		});
	};

/***/ }
/******/ ]);
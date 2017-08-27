/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mirrorObject = function mirrorObject(o) {
    return Object.keys(o).forEach(function (key) {
        return o[o[key]] = key;
    });
};

var Gestures = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4,
    A: 5,
    B: 6,
    None: null
};
mirrorObject(Gestures);

var konamiCodeEvent = new CustomEvent('konamiCode');

var konamiCode = [Gestures.Up, Gestures.Up, Gestures.Down, Gestures.Down, Gestures.Left, Gestures.Right, Gestures.Left, Gestures.Right, Gestures.B, Gestures.A];

var queue = [Gestures.None, Gestures.None, Gestures.None, Gestures.None, Gestures.None, Gestures.None, Gestures.None, Gestures.None, Gestures.None, Gestures.None];

var queueEqualsKonamiCode = function queueEqualsKonamiCode() {
    var result = true;
    for (var i = 0; i < konamiCode.length; i++) {
        if (konamiCode[i] !== queue[i]) {
            result = false;
            break;
        }
    }
    return result;
};

var addToQueue = function addToQueue(gesture) {
    queue.shift();
    queue.push(gesture);

    var gestureEvent = new CustomEvent('konamiCodeGesture', {
        detail: {
            code: gesture,
            name: Gestures[gesture]
        }
    });
    document.dispatchEvent(gestureEvent);

    if (queueEqualsKonamiCode()) {
        document.dispatchEvent(konamiCodeEvent);
    }
};

exports.Gestures = Gestures;
exports.addToQueue = addToQueue;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

__webpack_require__(3);

__webpack_require__(4);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _shared = __webpack_require__(0);

var dragging = false;
var endX = null;
var endY = null;
var startX = null;
var startY = null;
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

var onTouchStart = function onTouchStart(event) {
    dragging = false;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
};

var onTouchMove = function onTouchMove(event) {
    if (!startX || !startY) {
        return;
    }
    dragging = true;
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
};

var onTouchEnd = function onTouchEnd(event) {
    if (dragging) {
        var xDiff = startX - endX;
        var yDiff = startY - endY;
        var isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);

        if (isHorizontal) {
            (0, _shared.addToQueue)(xDiff > 0 ? _shared.Gestures.Left : _shared.Gestures.Right);
        } else {
            (0, _shared.addToQueue)(yDiff > 0 ? _shared.Gestures.Up : _shared.Gestures.Down);
        }

        dragging = false;
    } else {
        var isLeftHalf = startX < viewportWidth / 2;
        (0, _shared.addToQueue)(isLeftHalf ? _shared.Gestures.A : _shared.Gestures.B);
    }

    startX = null;
    startY = null;
};

document.addEventListener('touchstart', onTouchStart, false);
document.addEventListener('touchmove', onTouchMove, false);
document.addEventListener('touchend', onTouchEnd, false);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _shared = __webpack_require__(0);

var keyGestureMap = {
    ArrowLeft: _shared.Gestures.Left,
    ArrowRight: _shared.Gestures.Right,
    ArrowUp: _shared.Gestures.Up,
    ArrowDown: _shared.Gestures.Down,
    a: _shared.Gestures.A,
    b: _shared.Gestures.B
};

var onKeyUp = function onKeyUp(event) {
    var gesture = keyGestureMap[event.key] || _shared.Gestures.Invalid;
    (0, _shared.addToQueue)(gesture);
};

document.addEventListener('keyup', onKeyUp);

/***/ })
/******/ ]);
//# sourceMappingURL=konami-code.js.map
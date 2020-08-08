(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sr-visualizer"] = factory();
	else
		root["sr-visualizer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonpsr_visualizer"] = window["webpackJsonpsr_visualizer"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.ts","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/geometry/face.ts":
/*!******************************!*\
  !*** ./src/geometry/face.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Face4 = void 0;
var Face4 = /** @class */ (function () {
    function Face4(a, b, c, d, normal, color) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.verticies = [a, b, c, d];
        console.warn('need to calculate or set normal');
        this.normal = normal;
    }
    return Face4;
}());
exports.Face4 = Face4;


/***/ }),

/***/ "./src/geometry/geometry.ts":
/*!**********************************!*\
  !*** ./src/geometry/geometry.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = void 0;
var gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
var object3d_1 = __webpack_require__(/*! ./object3d */ "./src/geometry/object3d.ts");
var Geometry = /** @class */ (function (_super) {
    __extends(Geometry, _super);
    function Geometry(vertices, faces, color) {
        var _this = _super.call(this, color) || this;
        _this.vertices = vertices;
        _this.faces = faces;
        _this.calculateCentroid();
        return _this;
    }
    Geometry.prototype.calculateCentroid = function () {
        var cx = 0, cy = 0, cz = 0;
        this.vertices.forEach(function (vertex) {
            cx += vertex[0];
            cy += vertex[1];
            cz += vertex[2];
        });
        cx /= this.vertices.length;
        cy /= this.vertices.length;
        cz /= this.vertices.length;
        this.centroid = gl_matrix_1.vec3.clone([cx, cy, cz]);
    };
    return Geometry;
}(object3d_1.Object3D));
exports.Geometry = Geometry;


/***/ }),

/***/ "./src/geometry/object3d.ts":
/*!**********************************!*\
  !*** ./src/geometry/object3d.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Object3D = void 0;
var gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
var uuid = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var Object3D = /** @class */ (function () {
    function Object3D(color) {
        this.uid = uuid();
        this.color = color;
        this.matrix = gl_matrix_1.mat4.create();
    }
    Object3D.prototype.translate = function (vector) {
        gl_matrix_1.mat4.translate(this.matrix, this.matrix, vector);
    };
    Object3D.prototype.rotate = function (rad, axis) {
        gl_matrix_1.mat4.rotate(this.matrix, this.matrix, rad, axis);
    };
    return Object3D;
}());
exports.Object3D = Object3D;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.svgStep = exports.dothething = exports.getInputs = void 0;
var geometry_1 = __webpack_require__(/*! ./geometry/geometry */ "./src/geometry/geometry.ts");
var gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
var camera_1 = __webpack_require__(/*! ./rendering/camera */ "./src/rendering/camera.ts");
var THREE = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var scene_1 = __webpack_require__(/*! ./rendering/scene */ "./src/rendering/scene.ts");
var svgRenderer_1 = __webpack_require__(/*! ./rendering/svgRenderer */ "./src/rendering/svgRenderer.ts");
var face_1 = __webpack_require__(/*! ./geometry/face */ "./src/geometry/face.ts");
var red;
var blue;
var green;
var purple;
var orange;
var yellow;
var camera = new camera_1.Camera();
var renderer;
var scene;
var width = 500;
var height = 500;
var minx = -2;
var miny = -2;
var svgwidth = 4;
var svgheight = 4;
var planewidth = 1;
var redVerticies = [
    gl_matrix_1.vec3.clone([-1 / 2, 1 / 2, 1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, 1 / 2, 1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, -1 / 2, 1 / 2]),
    gl_matrix_1.vec3.clone([-1 / 2, -1 / 2, 1 / 2]),
];
var orangeVerticies = [
    gl_matrix_1.vec3.clone([-1 / 2, 1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, 1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, -1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([-1 / 2, -1 / 2, -1 / 2]),
];
var greenVerticies = [
    gl_matrix_1.vec3.clone([-1 / 2, 1 / 2, 1 / 2]),
    gl_matrix_1.vec3.clone([-1 / 2, 1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, 1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, 1 / 2, 1 / 2]),
];
var yellowVerticies = [
    gl_matrix_1.vec3.clone([-1 / 2, -1 / 2, 1 / 2]),
    gl_matrix_1.vec3.clone([-1 / 2, -1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, -1 / 2, -1 / 2]),
    gl_matrix_1.vec3.clone([1 / 2, -1 / 2, 1 / 2]),
];
var blueVerticies = [
    gl_matrix_1.vec3.fromValues(-1 / 2, 1 / 2, 1 / 2),
    gl_matrix_1.vec3.fromValues(-1 / 2, -1 / 2, 1 / 2),
    gl_matrix_1.vec3.fromValues(-1 / 2, -1 / 2, -1 / 2),
    gl_matrix_1.vec3.fromValues(-1 / 2, 1 / 2, -1 / 2),
];
var whiteVerticies = [
    gl_matrix_1.vec3.fromValues(1 / 2, 1 / 2, 1 / 2),
    gl_matrix_1.vec3.fromValues(1 / 2, -1 / 2, 1 / 2),
    gl_matrix_1.vec3.fromValues(1 / 2, -1 / 2, -1 / 2),
    gl_matrix_1.vec3.fromValues(1 / 2, 1 / 2, -1 / 2),
];
var faces = [
    new face_1.Face4(0, 1, 2, 3)
];
function setInputs() {
    if (camera && camera.matrix) {
        camera.matrix.forEach(function (value, index) {
            document.getElementById("c" + (index + 1)).value = value;
        });
    }
    document.getElementById("width").value = width;
    document.getElementById("height").value = height;
    document.getElementById("minx").value = minx;
    document.getElementById("miny").value = miny;
    document.getElementById("svgw").value = svgwidth;
    document.getElementById("svgh").value = svgheight;
    document.getElementById("pw").value = planewidth;
}
function getInputs() {
    var m1 = parseFloat(document.getElementById("c1").value);
    var m2 = parseFloat(document.getElementById("c2").value);
    var m3 = parseFloat(document.getElementById("c3").value);
    var m4 = parseFloat(document.getElementById("c4").value);
    var m5 = parseFloat(document.getElementById("c5").value);
    var m6 = parseFloat(document.getElementById("c6").value);
    var m7 = parseFloat(document.getElementById("c7").value);
    var m8 = parseFloat(document.getElementById("c8").value);
    var m9 = parseFloat(document.getElementById("c9").value);
    var m10 = parseFloat(document.getElementById("c10").value);
    var m11 = parseFloat(document.getElementById("c11").value);
    var m12 = parseFloat(document.getElementById("c12").value);
    var m13 = parseFloat(document.getElementById("c13").value);
    var m14 = parseFloat(document.getElementById("c14").value);
    var m15 = parseFloat(document.getElementById("c15").value);
    var m16 = parseFloat(document.getElementById("c16").value);
    camera.matrix = gl_matrix_1.mat4.fromValues(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16);
    width = parseFloat(document.getElementById("width").value);
    height = parseFloat(document.getElementById("height").value);
    minx = parseFloat(document.getElementById("minx").value);
    miny = parseFloat(document.getElementById("miny").value);
    svgwidth = parseFloat(document.getElementById("svgw").value);
    svgheight = parseFloat(document.getElementById("svgh").value);
    planewidth = parseFloat(document.getElementById("pw").value);
}
exports.getInputs = getInputs;
function dothething() {
    red = new geometry_1.Geometry(redVerticies, faces, { value: 'red' });
    green = new geometry_1.Geometry(greenVerticies, faces, { value: 'green' });
    blue = new geometry_1.Geometry(blueVerticies, faces, { value: 'blue' });
    purple = new geometry_1.Geometry(whiteVerticies, faces, { value: 'purple' });
    orange = new geometry_1.Geometry(orangeVerticies, faces, { value: 'orange' });
    yellow = new geometry_1.Geometry(yellowVerticies, faces, { value: 'yellow' });
    scene = new scene_1.Scene();
    renderer = new svgRenderer_1.SVGRenderer(width, height, minx, miny, svgwidth, svgheight);
    scene.add(green);
    scene.add(blue);
    scene.add(red);
    scene.add(purple);
    scene.add(orange);
    scene.add(yellow);
    document.getElementById('idsomething').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    setInputs();
}
exports.dothething = dothething;
document.addEventListener("DOMContentLoaded", function (event) {
    dothething();
    threejs();
});
function svgStep() {
    red.rotate(Math.PI / 16, [1, 1, 0]);
    green.rotate(Math.PI / 16, [1, 1, 0]);
    blue.rotate(Math.PI / 16, [1, 1, 0]);
    purple.rotate(Math.PI / 16, [1, 1, 0]);
    orange.rotate(Math.PI / 16, [1, 1, 0]);
    yellow.rotate(Math.PI / 16, [1, 1, 0]);
    renderer.render(scene, camera);
}
exports.svgStep = svgStep;
function threejs() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('threejs').appendChild(renderer.domElement);
    var origin = new THREE.Object3D();
    var redGeo = new THREE.PlaneGeometry(planewidth, planewidth);
    var redMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, side: THREE.DoubleSide });
    // redGeo.translate(planewidth/2, 0, 0);
    var redMesh = new THREE.Mesh(redGeo, redMaterial);
    redMesh.translateZ(planewidth / 2);
    var greenGeo = new THREE.PlaneGeometry(planewidth, planewidth);
    greenGeo.rotateX(Math.PI / 2);
    var greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00, side: THREE.DoubleSide });
    var greenMesh = new THREE.Mesh(greenGeo, greenMaterial);
    greenMesh.translateY(planewidth / 2);
    // greenGeo.translate(planewidth/2, 0, 0);
    var blueGeo = new THREE.PlaneGeometry(planewidth, planewidth);
    blueGeo.rotateY(Math.PI / 2);
    var blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide });
    var blueMesh = new THREE.Mesh(blueGeo, blueMaterial);
    blueMesh.translateX(-planewidth / 2);
    origin.add(redMesh);
    origin.add(greenMesh);
    origin.add(blueMesh);
    scene.add(origin);
    camera.position.z = 5;
    console.log(camera.projectionMatrix);
    var animate = function () {
        requestAnimationFrame(animate);
        origin.rotateX(Math.PI / 124);
        // plane.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
}


/***/ }),

/***/ "./src/rendering/camera.ts":
/*!*********************************!*\
  !*** ./src/rendering/camera.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
var gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
var Camera = /** @class */ (function () {
    function Camera() {
        this.matrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.perspective(this.matrix, Math.PI / 2, 1, .1, 1000);
        gl_matrix_1.mat4.translate(this.matrix, this.matrix, [0, 0, -5]);
        gl_matrix_1.mat4.scale(this.matrix, this.matrix, [4, 4, 1]);
    }
    return Camera;
}());
exports.Camera = Camera;


/***/ }),

/***/ "./src/rendering/scene.ts":
/*!********************************!*\
  !*** ./src/rendering/scene.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
var Scene = /** @class */ (function () {
    function Scene() {
        this.objects = [];
    }
    Scene.prototype.add = function (geometry) {
        this.objects.push(geometry);
    };
    return Scene;
}());
exports.Scene = Scene;


/***/ }),

/***/ "./src/rendering/svgRenderer.ts":
/*!**************************************!*\
  !*** ./src/rendering/svgRenderer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGRenderer = void 0;
var SVG = __webpack_require__(/*! svg.js */ "./node_modules/svg.js/dist/svg.js");
var gl_matrix_1 = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
var SVGRenderer = /** @class */ (function () {
    function SVGRenderer(width, height, minx, miny, svgWidth, svgHeight) {
        this.domElement = document.createElement('div');
        this.domElement.className = 'svg-renderer';
        this.svgDoc = SVG(this.domElement);
        this.svgDoc.width(width);
        this.svgDoc.height(height);
        this.svgDoc.viewbox(minx, miny, svgWidth, svgHeight);
    }
    SVGRenderer.prototype.render = function (scene, camera) {
        var _this = this;
        this.svgDoc.clear();
        var cameraPosition = gl_matrix_1.mat4.getTranslation(gl_matrix_1.vec3.create(), camera.matrix);
        // Sort objects by centroid furthest from camera
        scene.objects.sort(function (a, b) {
            var aModelView = gl_matrix_1.mat4.mul(gl_matrix_1.mat4.create(), camera.matrix, a.matrix);
            var bModelView = gl_matrix_1.mat4.mul(gl_matrix_1.mat4.create(), camera.matrix, b.matrix);
            var aCentroid = gl_matrix_1.vec3.transformMat4(gl_matrix_1.vec3.create(), a.centroid, aModelView);
            var bCentroid = gl_matrix_1.vec3.transformMat4(gl_matrix_1.vec3.create(), b.centroid, bModelView);
            // TODO actually use camera, currently only sorting by Z
            return bCentroid[2] - aCentroid[2];
        });
        scene.objects.forEach(function (object) {
            _this.renderObject(object, camera);
        });
    };
    SVGRenderer.prototype.renderObject = function (object, camera) {
        var _this = this;
        var modelView = gl_matrix_1.mat4.mul(gl_matrix_1.mat4.create(), camera.matrix, object.matrix);
        object.faces.forEach(function (face) {
            var points = [];
            face.verticies
                .map(function (index) { return object.vertices[index]; })
                .forEach(function (vertex) {
                var v = gl_matrix_1.vec3.transformMat4(gl_matrix_1.vec3.create(), vertex, modelView);
                var screenPoint = gl_matrix_1.vec3.multiply(v, v, [1, -1, 1]);
                points.push(screenPoint);
            });
            _this.drawPolygon(points, object.color);
        });
    };
    SVGRenderer.prototype.drawPolygon = function (points, color) {
        this.svgDoc.polygon(points.map(function (point) { return [point[0], point[1]]; }))
            .fill(color.value);
    };
    return SVGRenderer;
}());
exports.SVGRenderer = SVGRenderer;


/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map
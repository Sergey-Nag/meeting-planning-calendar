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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/create-page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/create-page.js":
/*!****************************!*\
  !*** ./src/create-page.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nError: Cannot find module '@babel/plugin-transform-runtime'\\nRequire stack:\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\files\\\\plugins.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\files\\\\index.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\index.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\babel-loader\\\\lib\\\\index.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\loader-runner\\\\lib\\\\loadLoader.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack\\\\lib\\\\NormalModuleFactory.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack\\\\lib\\\\Compiler.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack\\\\lib\\\\webpack.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack-cli\\\\lib\\\\webpack-cli.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack-cli\\\\lib\\\\bootstrap.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack-cli\\\\bin\\\\cli.js\\n- D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\webpack\\\\bin\\\\webpack.js\\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:797:15)\\n    at resolve (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\v8-compile-cache\\\\v8-compile-cache.js:164:23)\\n    at resolveStandardizedName (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\files\\\\plugins.js:100:7)\\n    at resolvePlugin (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\files\\\\plugins.js:44:10)\\n    at loadPlugin (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\files\\\\plugins.js:52:20)\\n    at createDescriptor (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\config-descriptors.js:154:9)\\n    at D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\config-descriptors.js:109:50\\n    at Array.map (<anonymous>)\\n    at createDescriptors (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\config-descriptors.js:109:29)\\n    at createPluginDescriptors (D:\\\\Other\\\\Projects\\\\CalendarApp\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\config\\\\config-descriptors.js:105:10)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3NyYy9jcmVhdGUtcGFnZS5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/create-page.js\n");

/***/ })

/******/ });
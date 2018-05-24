webpackHotUpdate(1,{

/***/ "./lib/context.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process, global) {/* harmony export (immutable) */ __webpack_exports__["a"] = getContext;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_jss__ = __webpack_require__("./node_modules/react-jss/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_jss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_jss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_material_ui_styles__ = __webpack_require__("./node_modules/material-ui/styles/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_material_ui_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_blue__ = __webpack_require__("./node_modules/material-ui/colors/blue.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_blue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_material_ui_colors_blue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_grey__ = __webpack_require__("./node_modules/material-ui/colors/grey.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_grey___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_material_ui_colors_grey__);
(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();





var theme = Object(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles__["createMuiTheme"])({
  palette: {
    primary: {
      main: __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_blue___default.a[700]
    },
    secondary: {
      main: __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_grey___default.a[700]
    }
  }
});

function createPageContext() {
  return {
    theme: theme,
    sheetsManager: new Map(),
    sheetsRegistry: new __WEBPACK_IMPORTED_MODULE_0_react_jss__["SheetsRegistry"](),
    generateClassName: Object(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles__["createGenerateClassName"])()
  };
}

function getContext() {
  if (!process.browser) {
    return createPageContext();
  }

  if (!global.INIT_MATERIAL_UI) {
    global.INIT_MATERIAL_UI = createPageContext();
  }

  return global.INIT_MATERIAL_UI;
}
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(theme, "theme", "/Users/me/Dev/devafter30/lib/context.js");
  reactHotLoader.register(createPageContext, "createPageContext", "/Users/me/Dev/devafter30/lib/context.js");
  reactHotLoader.register(getContext, "getContext", "/Users/me/Dev/devafter30/lib/context.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module), __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/material-ui/styles/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createGenerateClassName", {
  enumerable: true,
  get: function get() {
    return _createGenerateClassName.default;
  }
});
Object.defineProperty(exports, "createMuiTheme", {
  enumerable: true,
  get: function get() {
    return _createMuiTheme.default;
  }
});
Object.defineProperty(exports, "jssPreset", {
  enumerable: true,
  get: function get() {
    return _jssPreset.default;
  }
});
Object.defineProperty(exports, "MuiThemeProvider", {
  enumerable: true,
  get: function get() {
    return _MuiThemeProvider.default;
  }
});
Object.defineProperty(exports, "withStyles", {
  enumerable: true,
  get: function get() {
    return _withStyles.default;
  }
});
Object.defineProperty(exports, "withTheme", {
  enumerable: true,
  get: function get() {
    return _withTheme.default;
  }
});

var _createGenerateClassName = _interopRequireDefault(__webpack_require__("./node_modules/material-ui/styles/createGenerateClassName.js"));

var _createMuiTheme = _interopRequireDefault(__webpack_require__("./node_modules/material-ui/styles/createMuiTheme.js"));

var _jssPreset = _interopRequireDefault(__webpack_require__("./node_modules/material-ui/styles/jssPreset.js"));

var _MuiThemeProvider = _interopRequireDefault(__webpack_require__("./node_modules/material-ui/styles/MuiThemeProvider.js"));

var _withStyles = _interopRequireDefault(__webpack_require__("./node_modules/material-ui/styles/withStyles.js"));

var _withTheme = _interopRequireDefault(__webpack_require__("./node_modules/material-ui/styles/withTheme.js"));

/***/ })

})
//# sourceMappingURL=1.d14c175d715074f583c6.hot-update.js.map
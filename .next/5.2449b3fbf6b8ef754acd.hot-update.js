webpackHotUpdate(5,{

/***/ "./components/Header.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/next/node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_link__ = __webpack_require__("./node_modules/next/link.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_next_link__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_Toolbar__ = __webpack_require__("./node_modules/material-ui/Toolbar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_material_ui_Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_Grid__ = __webpack_require__("./node_modules/material-ui/Grid/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_Grid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_material_ui_Grid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_Hidden__ = __webpack_require__("./node_modules/material-ui/Hidden/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_Hidden___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_material_ui_Hidden__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_Avatar__ = __webpack_require__("./node_modules/material-ui/Avatar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_Avatar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_material_ui_Avatar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MenuDrop__ = __webpack_require__("./components/MenuDrop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SharedStyles__ = __webpack_require__("./components/SharedStyles.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SharedStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__SharedStyles__);
var _jsxFileName = "/Users/me/Dev/devafter30/components/Header.js";


(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();









var optionsMenu = [{
  text: 'Got question?',
  href: 'https://github.com/Ambition101'
}, {
  text: 'Log out',
  href: '/logout'
}];

function Header(_ref) {
  var user = _ref.user;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_material_ui_Toolbar___default.a, {
    style: __WEBPACK_IMPORTED_MODULE_8__SharedStyles__["styleToolbar"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Grid___default.a, {
    container: true,
    direction: "row",
    justify: "space-around",
    alignItems: "center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Grid___default.a, {
    item: true,
    sm: 10,
    xs: 9,
    style: {
      textAlign: 'left'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, user ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_Hidden___default.a, {
    smDown: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_next_link___default.a, {
    prefetch: true,
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    style: {
      marginRight: '20px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }, "Settings")))) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_next_link___default.a, {
    prefetch: true,
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_material_ui_Avatar___default.a, {
    src: "https://storage.googleapis.com/builderbook/logo.svg",
    alt: "Builder Book logo",
    style: {
      margin: '0px auto 0px 20px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_Grid___default.a, {
    item: true,
    sm: 1,
    xs: 3,
    style: {
      textAlign: 'right'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  }, user ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
    style: {
      whiteSpace: ' nowrap'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }, user.avatarUrl ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__MenuDrop__["a" /* default */], {
    options: optionsMenu,
    src: user.avatarUrl,
    alt: user.displayName,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    }
  }) : null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_next_link___default.a, {
    prefetch: true,
    href: "/login",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    }
  }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a", {
    style: {
      margin: '0px 20px 0px auto'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    }
  }, "Log in"))))));
}

Header.propTypes = {
  user: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    avatarUrl: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    displayName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })
};
Header.defaultProps = {
  user: null
};
var _default = Header;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(optionsMenu, "optionsMenu", "/Users/me/Dev/devafter30/components/Header.js");
  reactHotLoader.register(Header, "Header", "/Users/me/Dev/devafter30/components/Header.js");
  reactHotLoader.register(_default, "default", "/Users/me/Dev/devafter30/components/Header.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/SharedStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

var styleBigAvatar = {
  width: '80px',
  height: '80px',
  margin: '0px auto 15px'
};
var styleRaisedButton = {
  margin: '15px 15px 30px 15px',
  font: '15px Muli'
};
var styleToolbar = {
  background: '#FFF',
  height: '64px',
  paddingRight: '20px'
};
var styleLoginButton = {
  borderRadius: '2px',
  textTransform: 'none',
  font: '16px Muli',
  fontWeight: '400',
  letterSpacing: '0.01em',
  color: 'white',
  backgroundColor: '#DF4930'
};
var styleTextField = {
  font: '15px Muli',
  color: '#222',
  fontWeight: '300'
};
var styleForm = {
  margin: '7% auto',
  width: '360px'
};
var styleGrid = {
  margin: '0px auto',
  font: '16px Muli',
  color: '#222',
  fontWeight: '300',
  lineHeight: '1.5em'
};
module.exports = {
  styleBigAvatar: styleBigAvatar,
  styleRaisedButton: styleRaisedButton,
  styleToolbar: styleToolbar,
  styleLoginButton: styleLoginButton,
  styleTextField: styleTextField,
  styleForm: styleForm,
  styleGrid: styleGrid
};
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(styleBigAvatar, "styleBigAvatar", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  reactHotLoader.register(styleRaisedButton, "styleRaisedButton", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  reactHotLoader.register(styleToolbar, "styleToolbar", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  reactHotLoader.register(styleLoginButton, "styleLoginButton", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  reactHotLoader.register(styleTextField, "styleTextField", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  reactHotLoader.register(styleForm, "styleForm", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  reactHotLoader.register(styleGrid, "styleGrid", "/Users/me/Dev/devafter30/components/SharedStyles.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ })

})
//# sourceMappingURL=5.2449b3fbf6b8ef754acd.hot-update.js.map
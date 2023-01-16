"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/dashboard/latest-products.js":
/*!*****************************************************!*\
  !*** ./src/components/dashboard/latest-products.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LatestProducts\": function() { return /* binding */ LatestProducts; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_object_spread.mjs */ \"./node_modules/@swc/helpers/src/_object_spread.mjs\");\n/* harmony import */ var _swc_helpers_src_object_spread_props_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_object_spread_props.mjs */ \"./node_modules/@swc/helpers/src/_object_spread_props.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ \"./node_modules/date-fns/esm/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/index.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_icons_material_ArrowRight__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/icons-material/ArrowRight */ \"./node_modules/@mui/icons-material/ArrowRight.js\");\n/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/MoreVert */ \"./node_modules/@mui/icons-material/MoreVert.js\");\n\n\nvar _this = undefined;\n\n\n\n\n\n\nvar products = [\n    {\n        id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)(),\n        name: \"Network Strategic Planner Template\",\n        imageUrl: \"./static/images/products/file.png\",\n        updatedAt: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.subHours)(Date.now(), 2)\n    },\n    {\n        id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)(),\n        name: \"Total Cost of Care\",\n        imageUrl: \"./static/images/products/file.png\",\n        updatedAt: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.subHours)(Date.now(), 2)\n    },\n    {\n        id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)(),\n        name: \"Enloe NSP\",\n        imageUrl: \"./static/images/products/file.png\",\n        updatedAt: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.subHours)(Date.now(), 3)\n    },\n    {\n        id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)(),\n        name: \"Stanford NSP\",\n        imageUrl: \"./static/images/products/file.png\",\n        updatedAt: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.subHours)(Date.now(), 5)\n    },\n    {\n        id: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)(),\n        name: \"Providence LA NSP\",\n        imageUrl: \"./static/images/products/file.png\",\n        updatedAt: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.subHours)(Date.now(), 9)\n    }\n];\nvar LatestProducts = function(props) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Card, (0,_swc_helpers_src_object_spread_props_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])((0,_swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])({}, props), {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.CardHeader, {\n                subtitle: \"\".concat(products.length, \" in total\"),\n                title: \"Recent Documents\"\n            }, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                lineNumber: 53,\n                columnNumber: 5\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Divider, {}, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                lineNumber: 57,\n                columnNumber: 5\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.List, {\n                children: products.map(function(product, i) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ListItem, {\n                        divider: i < products.length - 1,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ListItemAvatar, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                    alt: product.name,\n                                    src: product.imageUrl,\n                                    style: {\n                                        height: 48,\n                                        width: 48\n                                    }\n                                }, void 0, false, {\n                                    fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                                    lineNumber: 65,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                                lineNumber: 64,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ListItemText, {\n                                primary: product.name,\n                                secondary: \"Updated \".concat((0,date_fns__WEBPACK_IMPORTED_MODULE_2__.formatDistanceToNow)(product.updatedAt))\n                            }, void 0, false, {\n                                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                                lineNumber: 74,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.IconButton, {\n                                edge: \"end\",\n                                size: \"small\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                    fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                                    lineNumber: 82,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                                lineNumber: 78,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, product.id, true, {\n                        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                        lineNumber: 60,\n                        columnNumber: 9\n                    }, _this);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                lineNumber: 58,\n                columnNumber: 5\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Divider, {}, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                lineNumber: 87,\n                columnNumber: 5\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                sx: {\n                    display: \"flex\",\n                    justifyContent: \"flex-end\",\n                    p: 2\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                    color: \"primary\",\n                    endIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_ArrowRight__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, void 0, void 0),\n                    size: \"small\",\n                    variant: \"text\",\n                    children: \"View all\"\n                }, void 0, false, {\n                    fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                    lineNumber: 95,\n                    columnNumber: 7\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n                lineNumber: 88,\n                columnNumber: 5\n            }, _this)\n        ]\n    }), void 0, true, {\n        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/latest-products.js\",\n        lineNumber: 52,\n        columnNumber: 3\n    }, _this);\n};\n_c = LatestProducts;\nvar _c;\n$RefreshReg$(_c, \"LatestProducts\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvbGF0ZXN0LXByb2R1Y3RzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUF5RDtBQUN2QjtBQVlYO0FBQ3FDO0FBQ0o7QUFFeEQsSUFBTWdCLFFBQVEsR0FBRztJQUNmO1FBQ0VDLEVBQUUsRUFBRWQsd0NBQUksRUFBRTtRQUNWZSxJQUFJLEVBQUUsb0NBQW9DO1FBQzFDQyxRQUFRLEVBQUUsbUNBQW1DO1FBQzdDQyxTQUFTLEVBQUVuQixrREFBUSxDQUFDb0IsSUFBSSxDQUFDQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkM7SUFDRDtRQUNFTCxFQUFFLEVBQUVkLHdDQUFJLEVBQUU7UUFDVmUsSUFBSSxFQUFFLG9CQUFvQjtRQUMxQkMsUUFBUSxFQUFFLG1DQUFtQztRQUM3Q0MsU0FBUyxFQUFFbkIsa0RBQVEsQ0FBQ29CLElBQUksQ0FBQ0MsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25DO0lBQ0Q7UUFDRUwsRUFBRSxFQUFFZCx3Q0FBSSxFQUFFO1FBQ1ZlLElBQUksRUFBRSxXQUFXO1FBQ2pCQyxRQUFRLEVBQUUsbUNBQW1DO1FBQzdDQyxTQUFTLEVBQUVuQixrREFBUSxDQUFDb0IsSUFBSSxDQUFDQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkM7SUFDRDtRQUNFTCxFQUFFLEVBQUVkLHdDQUFJLEVBQUU7UUFDVmUsSUFBSSxFQUFFLGNBQWM7UUFDcEJDLFFBQVEsRUFBRSxtQ0FBbUM7UUFDN0NDLFNBQVMsRUFBRW5CLGtEQUFRLENBQUNvQixJQUFJLENBQUNDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNuQztJQUNEO1FBQ0VMLEVBQUUsRUFBRWQsd0NBQUksRUFBRTtRQUNWZSxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCQyxRQUFRLEVBQUUsbUNBQW1DO1FBQzdDQyxTQUFTLEVBQUVuQixrREFBUSxDQUFDb0IsSUFBSSxDQUFDQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkM7Q0FDRjtBQUVNLElBQU1DLGNBQWMsR0FBRyxTQUFDQyxLQUFLO3lCQUNsQyw4REFBQ2xCLCtDQUFJLDBLQUFLa0IsS0FBSzs7MEJBQ2IsOERBQUNqQixxREFBVTtnQkFDVGtCLFFBQVEsRUFBRSxFQUFDLENBQWtCLE1BQVMsQ0FBekJULFFBQVEsQ0FBQ1UsTUFBTSxFQUFDLFdBQVMsQ0FBQztnQkFDdkNDLEtBQUssRUFBQyxrQkFBa0I7Ozs7O3FCQUN4QjswQkFDRiw4REFBQ25CLGtEQUFPOzs7O3FCQUFHOzBCQUNYLDhEQUFDRSwrQ0FBSTswQkFDRk0sUUFBUSxDQUFDWSxHQUFHLENBQUMsU0FBQ0MsT0FBTyxFQUFFQyxDQUFDO3lDQUN2Qiw4REFBQ25CLG1EQUFRO3dCQUNQb0IsT0FBTyxFQUFFRCxDQUFDLEdBQUdkLFFBQVEsQ0FBQ1UsTUFBTSxHQUFHLENBQUM7OzBDQUdoQyw4REFBQ2QseURBQWM7MENBQ2IsNEVBQUNvQixLQUFHO29DQUNGQyxHQUFHLEVBQUVKLE9BQU8sQ0FBQ1gsSUFBSTtvQ0FDakJnQixHQUFHLEVBQUVMLE9BQU8sQ0FBQ1YsUUFBUTtvQ0FDckJnQixLQUFLLEVBQUU7d0NBQ0xDLE1BQU0sRUFBRSxFQUFFO3dDQUNWQyxLQUFLLEVBQUUsRUFBRTtxQ0FDVjs7Ozs7eUNBQ0Q7Ozs7O3FDQUNhOzBDQUNqQiw4REFBQ3hCLHVEQUFZO2dDQUNYeUIsT0FBTyxFQUFFVCxPQUFPLENBQUNYLElBQUk7Z0NBQ3JCcUIsU0FBUyxFQUFFLFVBQVMsQ0FBeUMsT0FBdkN2Qyw2REFBbUIsQ0FBQzZCLE9BQU8sQ0FBQ1QsU0FBUyxDQUFDLENBQUU7Ozs7O3FDQUM5RDswQ0FDRiw4REFBQ1gscURBQVU7Z0NBQ1QrQixJQUFJLEVBQUMsS0FBSztnQ0FDVkMsSUFBSSxFQUFDLE9BQU87MENBRVosNEVBQUMxQixvRUFBWTs7Ozt5Q0FBRzs7Ozs7cUNBQ0w7O3VCQXJCUmMsT0FBTyxDQUFDWixFQUFFOzs7OzZCQXNCTjtpQkFDWixDQUFDOzs7OztxQkFDRzswQkFDUCw4REFBQ1Qsa0RBQU87Ozs7cUJBQUc7MEJBQ1gsOERBQUNKLDhDQUFHO2dCQUNGc0MsRUFBRSxFQUFFO29CQUNGQyxPQUFPLEVBQUUsTUFBTTtvQkFDZkMsY0FBYyxFQUFFLFVBQVU7b0JBQzFCQyxDQUFDLEVBQUUsQ0FBQztpQkFDTDswQkFFRCw0RUFBQ3hDLGlEQUFNO29CQUNMeUMsS0FBSyxFQUFDLFNBQVM7b0JBQ2ZDLE9BQU8sZ0JBQUUsOERBQUNqQyxzRUFBYyxvQ0FBRztvQkFDM0IyQixJQUFJLEVBQUMsT0FBTztvQkFDWk8sT0FBTyxFQUFDLE1BQU07OEJBQ2YsVUFFRDs7Ozs7eUJBQVM7Ozs7O3FCQUNMOzs7Ozs7YUFDRDtDQUNSLENBQUM7QUF0RFd6QixLQUFBQSxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC9sYXRlc3QtcHJvZHVjdHMuanM/ZjZhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXREaXN0YW5jZVRvTm93LCBzdWJIb3VycyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBDYXJkLFxuICBDYXJkSGVhZGVyLFxuICBEaXZpZGVyLFxuICBJY29uQnV0dG9uLFxuICBMaXN0LFxuICBMaXN0SXRlbSxcbiAgTGlzdEl0ZW1BdmF0YXIsXG4gIExpc3RJdGVtVGV4dFxufSBmcm9tICdAbXVpL21hdGVyaWFsJztcbmltcG9ydCBBcnJvd1JpZ2h0SWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL0Fycm93UmlnaHQnO1xuaW1wb3J0IE1vcmVWZXJ0SWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL01vcmVWZXJ0JztcblxuY29uc3QgcHJvZHVjdHMgPSBbXG4gIHtcbiAgICBpZDogdXVpZCgpLFxuICAgIG5hbWU6ICdOZXR3b3JrIFN0cmF0ZWdpYyBQbGFubmVyIFRlbXBsYXRlJyxcbiAgICBpbWFnZVVybDogJy4vc3RhdGljL2ltYWdlcy9wcm9kdWN0cy9maWxlLnBuZycsXG4gICAgdXBkYXRlZEF0OiBzdWJIb3VycyhEYXRlLm5vdygpLCAyKVxuICB9LFxuICB7XG4gICAgaWQ6IHV1aWQoKSxcbiAgICBuYW1lOiAnVG90YWwgQ29zdCBvZiBDYXJlJyxcbiAgICBpbWFnZVVybDogJy4vc3RhdGljL2ltYWdlcy9wcm9kdWN0cy9maWxlLnBuZycsXG4gICAgdXBkYXRlZEF0OiBzdWJIb3VycyhEYXRlLm5vdygpLCAyKVxuICB9LFxuICB7XG4gICAgaWQ6IHV1aWQoKSxcbiAgICBuYW1lOiAnRW5sb2UgTlNQJyxcbiAgICBpbWFnZVVybDogJy4vc3RhdGljL2ltYWdlcy9wcm9kdWN0cy9maWxlLnBuZycsXG4gICAgdXBkYXRlZEF0OiBzdWJIb3VycyhEYXRlLm5vdygpLCAzKVxuICB9LFxuICB7XG4gICAgaWQ6IHV1aWQoKSxcbiAgICBuYW1lOiAnU3RhbmZvcmQgTlNQJyxcbiAgICBpbWFnZVVybDogJy4vc3RhdGljL2ltYWdlcy9wcm9kdWN0cy9maWxlLnBuZycsXG4gICAgdXBkYXRlZEF0OiBzdWJIb3VycyhEYXRlLm5vdygpLCA1KVxuICB9LFxuICB7XG4gICAgaWQ6IHV1aWQoKSxcbiAgICBuYW1lOiAnUHJvdmlkZW5jZSBMQSBOU1AnLFxuICAgIGltYWdlVXJsOiAnLi9zdGF0aWMvaW1hZ2VzL3Byb2R1Y3RzL2ZpbGUucG5nJyxcbiAgICB1cGRhdGVkQXQ6IHN1YkhvdXJzKERhdGUubm93KCksIDkpXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBMYXRlc3RQcm9kdWN0cyA9IChwcm9wcykgPT4gKFxuICA8Q2FyZCB7Li4ucHJvcHN9PlxuICAgIDxDYXJkSGVhZGVyXG4gICAgICBzdWJ0aXRsZT17YCR7cHJvZHVjdHMubGVuZ3RofSBpbiB0b3RhbGB9XG4gICAgICB0aXRsZT1cIlJlY2VudCBEb2N1bWVudHNcIlxuICAgIC8+XG4gICAgPERpdmlkZXIgLz5cbiAgICA8TGlzdD5cbiAgICAgIHtwcm9kdWN0cy5tYXAoKHByb2R1Y3QsIGkpID0+IChcbiAgICAgICAgPExpc3RJdGVtXG4gICAgICAgICAgZGl2aWRlcj17aSA8IHByb2R1Y3RzLmxlbmd0aCAtIDF9XG4gICAgICAgICAga2V5PXtwcm9kdWN0LmlkfVxuICAgICAgICA+XG4gICAgICAgICAgPExpc3RJdGVtQXZhdGFyPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBhbHQ9e3Byb2R1Y3QubmFtZX1cbiAgICAgICAgICAgICAgc3JjPXtwcm9kdWN0LmltYWdlVXJsfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGhlaWdodDogNDgsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGlzdEl0ZW1BdmF0YXI+XG4gICAgICAgICAgPExpc3RJdGVtVGV4dFxuICAgICAgICAgICAgcHJpbWFyeT17cHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgc2Vjb25kYXJ5PXtgVXBkYXRlZCAke2Zvcm1hdERpc3RhbmNlVG9Ob3cocHJvZHVjdC51cGRhdGVkQXQpfWB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgZWRnZT1cImVuZFwiXG4gICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNb3JlVmVydEljb24gLz5cbiAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICApKX1cbiAgICA8L0xpc3Q+XG4gICAgPERpdmlkZXIgLz5cbiAgICA8Qm94XG4gICAgICBzeD17e1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxuICAgICAgICBwOiAyXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgZW5kSWNvbj17PEFycm93UmlnaHRJY29uIC8+fVxuICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICB2YXJpYW50PVwidGV4dFwiXG4gICAgICA+XG4gICAgICAgIFZpZXcgYWxsXG4gICAgICA8L0J1dHRvbj5cbiAgICA8L0JveD5cbiAgPC9DYXJkPlxuKTtcbiJdLCJuYW1lcyI6WyJmb3JtYXREaXN0YW5jZVRvTm93Iiwic3ViSG91cnMiLCJ2NCIsInV1aWQiLCJCb3giLCJCdXR0b24iLCJDYXJkIiwiQ2FyZEhlYWRlciIsIkRpdmlkZXIiLCJJY29uQnV0dG9uIiwiTGlzdCIsIkxpc3RJdGVtIiwiTGlzdEl0ZW1BdmF0YXIiLCJMaXN0SXRlbVRleHQiLCJBcnJvd1JpZ2h0SWNvbiIsIk1vcmVWZXJ0SWNvbiIsInByb2R1Y3RzIiwiaWQiLCJuYW1lIiwiaW1hZ2VVcmwiLCJ1cGRhdGVkQXQiLCJEYXRlIiwibm93IiwiTGF0ZXN0UHJvZHVjdHMiLCJwcm9wcyIsInN1YnRpdGxlIiwibGVuZ3RoIiwidGl0bGUiLCJtYXAiLCJwcm9kdWN0IiwiaSIsImRpdmlkZXIiLCJpbWciLCJhbHQiLCJzcmMiLCJzdHlsZSIsImhlaWdodCIsIndpZHRoIiwicHJpbWFyeSIsInNlY29uZGFyeSIsImVkZ2UiLCJzaXplIiwic3giLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJwIiwiY29sb3IiLCJlbmRJY29uIiwidmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/dashboard/latest-products.js\n"));

/***/ })

});
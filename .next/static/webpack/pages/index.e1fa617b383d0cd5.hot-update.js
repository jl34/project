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

/***/ "./src/components/dashboard/traffic-by-device.js":
/*!*******************************************************!*\
  !*** ./src/components/dashboard/traffic-by-device.js ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TrafficByDevice\": function() { return /* binding */ TrafficByDevice; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_object_spread.mjs */ \"./node_modules/@swc/helpers/src/_object_spread.mjs\");\n/* harmony import */ var _swc_helpers_src_object_spread_props_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/src/_object_spread_props.mjs */ \"./node_modules/@swc/helpers/src/_object_spread_props.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ \"./node_modules/react-chartjs-2/dist/index.modern.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\nvar TrafficByDevice = function(props) {\n    _s();\n    var theme = (0,_mui_material__WEBPACK_IMPORTED_MODULE_2__.useTheme)();\n    var data = {\n        datasets: [\n            {\n                data: [\n                    63,\n                    15,\n                    22\n                ],\n                backgroundColor: [\n                    \"#66CDAA\",\n                    \"#DAA520\",\n                    \"#e53935\"\n                ],\n                borderWidth: 8,\n                borderColor: \"#FFFFFF\",\n                hoverBorderColor: \"#FFFFFF\"\n            }\n        ],\n        labels: [\n            \"Complete\",\n            \"In Progress\",\n            \"Not Started\"\n        ]\n    };\n    var options = {\n        animation: false,\n        cutoutPercentage: 80,\n        layout: {\n            padding: 0\n        },\n        legend: {\n            display: false\n        },\n        maintainAspectRatio: false,\n        responsive: true,\n        tooltips: {\n            backgroundColor: theme.palette.background.paper,\n            bodyFontColor: theme.palette.text.secondary,\n            borderColor: theme.palette.divider,\n            borderWidth: 1,\n            enabled: true,\n            footerFontColor: theme.palette.text.secondary,\n            intersect: false,\n            mode: \"index\",\n            titleFontColor: theme.palette.text.primary\n        }\n    };\n    var devices = [\n        {\n            title: \"Has Completed\",\n            value: 63,\n            color: \"#66CDAA\"\n        },\n        {\n            title: \"In Progress\",\n            value: 15,\n            color: \"#DAA520\"\n        },\n        {\n            title: \"Not Started\",\n            value: 23,\n            color: \"#e53935\"\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Card, (0,_swc_helpers_src_object_spread_props_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])((0,_swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({}, props), {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.CardHeader, {\n                title: \"Status Chart\"\n            }, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Divider, {}, void 0, false, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.CardContent, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                        sx: {\n                            height: 300,\n                            position: \"relative\"\n                        },\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__.Doughnut, {\n                            data: data,\n                            options: options\n                        }, void 0, false, {\n                            fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                            lineNumber: 72,\n                            columnNumber: 11\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                        sx: {\n                            display: \"flex\",\n                            justifyContent: \"center\",\n                            pt: 2\n                        },\n                        children: devices.map(function(param) {\n                            var color = param.color, Icon = param.icon, title = param.title, value = param.value;\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                                sx: {\n                                    p: 1,\n                                    textAlign: \"center\"\n                                },\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {\n                                        color: \"textPrimary\",\n                                        variant: \"body1\",\n                                        children: title\n                                    }, void 0, false, {\n                                        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                                        lineNumber: 98,\n                                        columnNumber: 15\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {\n                                        style: {\n                                            color: color\n                                        },\n                                        variant: \"h4\",\n                                        children: [\n                                            value,\n                                            \"%\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                                        lineNumber: 104,\n                                        columnNumber: 15\n                                    }, _this)\n                                ]\n                            }, title, true, {\n                                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                                lineNumber: 90,\n                                columnNumber: 13\n                            }, _this);\n                        })\n                    }, void 0, false, {\n                        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                        lineNumber: 77,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, _this)\n        ]\n    }), void 0, true, {\n        fileName: \"/Users/Jennifer/Visual Studio/project/src/components/dashboard/traffic-by-device.js\",\n        lineNumber: 62,\n        columnNumber: 5\n    }, _this);\n};\n_s(TrafficByDevice, \"VrMvFCCB9Haniz3VCRPNUiCauHs=\", false, function() {\n    return [\n        _mui_material__WEBPACK_IMPORTED_MODULE_2__.useTheme\n    ];\n});\n_c = TrafficByDevice;\nvar _c;\n$RefreshReg$(_c, \"TrafficByDevice\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQvdHJhZmZpYy1ieS1kZXZpY2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7OztBQUEyQztBQUN1RDtBQUczRixJQUFNUSxlQUFlLEdBQUcsU0FBQ0MsS0FBSyxFQUFLOztJQUN4QyxJQUFNQyxLQUFLLEdBQUdILHVEQUFRLEVBQUU7SUFFeEIsSUFBTUksSUFBSSxHQUFHO1FBQ1hDLFFBQVEsRUFBRTtZQUNSO2dCQUNFRCxJQUFJLEVBQUU7QUFBQyxzQkFBRTtBQUFFLHNCQUFFO0FBQUUsc0JBQUU7aUJBQUM7Z0JBQ2xCRSxlQUFlLEVBQUU7b0JBQUMsU0FBUztvQkFBRSxTQUFTO29CQUFFLFNBQVM7aUJBQUM7Z0JBQ2xEQyxXQUFXLEVBQUUsQ0FBQztnQkFDZEMsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCQyxnQkFBZ0IsRUFBRSxTQUFTO2FBQzVCO1NBQ0Y7UUFDREMsTUFBTSxFQUFFO1lBQUMsVUFBVTtZQUFFLGFBQWE7WUFBRSxhQUFhO1NBQUM7S0FDbkQ7SUFFRCxJQUFNQyxPQUFPLEdBQUc7UUFDZEMsU0FBUyxFQUFFLEtBQUs7UUFDaEJDLGdCQUFnQixFQUFFLEVBQUU7UUFDcEJDLE1BQU0sRUFBRTtZQUFFQyxPQUFPLEVBQUUsQ0FBQztTQUFFO1FBQ3RCQyxNQUFNLEVBQUU7WUFDTkMsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNEQyxtQkFBbUIsRUFBRSxLQUFLO1FBQzFCQyxVQUFVLEVBQUUsSUFBSTtRQUNoQkMsUUFBUSxFQUFFO1lBQ1JkLGVBQWUsRUFBRUgsS0FBSyxDQUFDa0IsT0FBTyxDQUFDQyxVQUFVLENBQUNDLEtBQUs7WUFDL0NDLGFBQWEsRUFBRXJCLEtBQUssQ0FBQ2tCLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDQyxTQUFTO1lBQzNDbEIsV0FBVyxFQUFFTCxLQUFLLENBQUNrQixPQUFPLENBQUNNLE9BQU87WUFDbENwQixXQUFXLEVBQUUsQ0FBQztZQUNkcUIsT0FBTyxFQUFFLElBQUk7WUFDYkMsZUFBZSxFQUFFMUIsS0FBSyxDQUFDa0IsT0FBTyxDQUFDSSxJQUFJLENBQUNDLFNBQVM7WUFDN0NJLFNBQVMsRUFBRSxLQUFLO1lBQ2hCQyxJQUFJLEVBQUUsT0FBTztZQUNiQyxjQUFjLEVBQUU3QixLQUFLLENBQUNrQixPQUFPLENBQUNJLElBQUksQ0FBQ1EsT0FBTztTQUMzQztLQUNGO0lBRUQsSUFBTUMsT0FBTyxHQUFHO1FBQ2Q7WUFDRUMsS0FBSyxFQUFFLGVBQWU7WUFDdEJDLEtBQUssRUFBRSxFQUFFO1lBQ1RDLEtBQUssRUFBRSxTQUFTO1NBQ2pCO1FBQ0Q7WUFDRUYsS0FBSyxFQUFFLGFBQWE7WUFDcEJDLEtBQUssRUFBRSxFQUFFO1lBQ1RDLEtBQUssRUFBRSxTQUFTO1NBQ2pCO1FBQ0Q7WUFDRUYsS0FBSyxFQUFFLGFBQWE7WUFDcEJDLEtBQUssRUFBRSxFQUFFO1lBQ1RDLEtBQUssRUFBRSxTQUFTO1NBQ2pCO0tBQ0Y7SUFFRCxxQkFDRSw4REFBQzFDLCtDQUFJLDBLQUFLTyxLQUFLOzswQkFDYiw4REFBQ0wscURBQVU7Z0JBQUNzQyxLQUFLLEVBQUMsY0FBYzs7Ozs7cUJBQUc7MEJBQ25DLDhEQUFDckMsa0RBQU87Ozs7cUJBQUc7MEJBQ1gsOERBQUNGLHNEQUFXOztrQ0FDViw4REFBQ0YsOENBQUc7d0JBQ0Y0QyxFQUFFLEVBQUU7NEJBQ0ZDLE1BQU0sRUFBRSxHQUFHOzRCQUNYQyxRQUFRLEVBQUUsVUFBVTt5QkFDckI7a0NBRUQsNEVBQUMvQyxxREFBUTs0QkFDUFcsSUFBSSxFQUFFQSxJQUFJOzRCQUNWTyxPQUFPLEVBQUVBLE9BQU87Ozs7O2lDQUNoQjs7Ozs7NkJBQ0U7a0NBQ04sOERBQUNqQiw4Q0FBRzt3QkFDRjRDLEVBQUUsRUFBRTs0QkFDRnJCLE9BQU8sRUFBRSxNQUFNOzRCQUNmd0IsY0FBYyxFQUFFLFFBQVE7NEJBQ3hCQyxFQUFFLEVBQUUsQ0FBQzt5QkFDTjtrQ0FFQVIsT0FBTyxDQUFDUyxHQUFHLENBQUM7Z0NBQ1hOLEtBQUssU0FBTEEsS0FBSyxFQUNMTyxJQUFVLFNBQVZBLElBQUksRUFDSlQsS0FBSyxTQUFMQSxLQUFLLEVBQ0xDLEtBQUssU0FBTEEsS0FBSztpREFFTCw4REFBQzFDLDhDQUFHO2dDQUVGNEMsRUFBRSxFQUFFO29DQUNGUSxDQUFDLEVBQUUsQ0FBQztvQ0FDSkMsU0FBUyxFQUFFLFFBQVE7aUNBQ3BCOztrREFHRCw4REFBQ2hELHFEQUFVO3dDQUNUc0MsS0FBSyxFQUFDLGFBQWE7d0NBQ25CVyxPQUFPLEVBQUMsT0FBTztrREFFZGIsS0FBSzs7Ozs7NkNBQ0s7a0RBQ2IsOERBQUNwQyxxREFBVTt3Q0FDVGtELEtBQUssRUFBRTs0Q0FBRVosS0FBSyxFQUFMQSxLQUFLO3lDQUFFO3dDQUNoQlcsT0FBTyxFQUFDLElBQUk7OzRDQUVYWixLQUFLOzRDQUFDLEdBRVQ7Ozs7Ozs2Q0FBYTs7K0JBbkJSRCxLQUFLOzs7O3FDQW9CTjt5QkFDUCxDQUFDOzs7Ozs2QkFDRTs7Ozs7O3FCQUNNOzs7Ozs7YUFDVCxDQUNQO0FBQ0osQ0FBQyxDQUFDO0dBaEhXbEMsZUFBZTs7UUFDWkQsbURBQVE7OztBQURYQyxLQUFBQSxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC90cmFmZmljLWJ5LWRldmljZS5qcz9lYTAwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvdWdobnV0IH0gZnJvbSAncmVhY3QtY2hhcnRqcy0yJztcbmltcG9ydCB7IEJveCwgQ2FyZCwgQ2FyZENvbnRlbnQsIENhcmRIZWFkZXIsIERpdmlkZXIsIFR5cG9ncmFwaHksIHVzZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5cblxuZXhwb3J0IGNvbnN0IFRyYWZmaWNCeURldmljZSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBkYXRhc2V0czogW1xuICAgICAge1xuICAgICAgICBkYXRhOiBbNjMsIDE1LCAyMl0sXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogWycjNjZDREFBJywgJyNEQUE1MjAnLCAnI2U1MzkzNSddLFxuICAgICAgICBib3JkZXJXaWR0aDogOCxcbiAgICAgICAgYm9yZGVyQ29sb3I6ICcjRkZGRkZGJyxcbiAgICAgICAgaG92ZXJCb3JkZXJDb2xvcjogJyNGRkZGRkYnXG4gICAgICB9XG4gICAgXSxcbiAgICBsYWJlbHM6IFsnQ29tcGxldGUnLCAnSW4gUHJvZ3Jlc3MnLCAnTm90IFN0YXJ0ZWQnXVxuICB9O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICBjdXRvdXRQZXJjZW50YWdlOiA4MCxcbiAgICBsYXlvdXQ6IHsgcGFkZGluZzogMCB9LFxuICAgIGxlZ2VuZDoge1xuICAgICAgZGlzcGxheTogZmFsc2VcbiAgICB9LFxuICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgdG9vbHRpcHM6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5iYWNrZ3JvdW5kLnBhcGVyLFxuICAgICAgYm9keUZvbnRDb2xvcjogdGhlbWUucGFsZXR0ZS50ZXh0LnNlY29uZGFyeSxcbiAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYWxldHRlLmRpdmlkZXIsXG4gICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBmb290ZXJGb250Q29sb3I6IHRoZW1lLnBhbGV0dGUudGV4dC5zZWNvbmRhcnksXG4gICAgICBpbnRlcnNlY3Q6IGZhbHNlLFxuICAgICAgbW9kZTogJ2luZGV4JyxcbiAgICAgIHRpdGxlRm9udENvbG9yOiB0aGVtZS5wYWxldHRlLnRleHQucHJpbWFyeVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZXZpY2VzID0gW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnSGFzIENvbXBsZXRlZCcsXG4gICAgICB2YWx1ZTogNjMsXG4gICAgICBjb2xvcjogJyM2NkNEQUEnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0luIFByb2dyZXNzJyxcbiAgICAgIHZhbHVlOiAxNSxcbiAgICAgIGNvbG9yOiAnI0RBQTUyMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnTm90IFN0YXJ0ZWQnLFxuICAgICAgdmFsdWU6IDIzLFxuICAgICAgY29sb3I6ICcjZTUzOTM1J1xuICAgIH1cbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxDYXJkIHsuLi5wcm9wc30+XG4gICAgICA8Q2FyZEhlYWRlciB0aXRsZT1cIlN0YXR1cyBDaGFydFwiIC8+XG4gICAgICA8RGl2aWRlciAvPlxuICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICA8Qm94XG4gICAgICAgICAgc3g9e3tcbiAgICAgICAgICAgIGhlaWdodDogMzAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPERvdWdobnV0XG4gICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICBwdDogMlxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7ZGV2aWNlcy5tYXAoKHtcbiAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgaWNvbjogSWNvbixcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICB9KSA9PiAoXG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIGtleT17dGl0bGV9XG4gICAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgICAgcDogMSxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxUeXBvZ3JhcGh5XG4gICAgICAgICAgICAgICAgY29sb3I9XCJ0ZXh0UHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cImJvZHkxXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICA8VHlwb2dyYXBoeVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yIH19XG4gICAgICAgICAgICAgICAgdmFyaWFudD1cImg0XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgICAgICAlXG4gICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgPC9DYXJkPlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJEb3VnaG51dCIsIkJveCIsIkNhcmQiLCJDYXJkQ29udGVudCIsIkNhcmRIZWFkZXIiLCJEaXZpZGVyIiwiVHlwb2dyYXBoeSIsInVzZVRoZW1lIiwiVHJhZmZpY0J5RGV2aWNlIiwicHJvcHMiLCJ0aGVtZSIsImRhdGEiLCJkYXRhc2V0cyIsImJhY2tncm91bmRDb2xvciIsImJvcmRlcldpZHRoIiwiYm9yZGVyQ29sb3IiLCJob3ZlckJvcmRlckNvbG9yIiwibGFiZWxzIiwib3B0aW9ucyIsImFuaW1hdGlvbiIsImN1dG91dFBlcmNlbnRhZ2UiLCJsYXlvdXQiLCJwYWRkaW5nIiwibGVnZW5kIiwiZGlzcGxheSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJyZXNwb25zaXZlIiwidG9vbHRpcHMiLCJwYWxldHRlIiwiYmFja2dyb3VuZCIsInBhcGVyIiwiYm9keUZvbnRDb2xvciIsInRleHQiLCJzZWNvbmRhcnkiLCJkaXZpZGVyIiwiZW5hYmxlZCIsImZvb3RlckZvbnRDb2xvciIsImludGVyc2VjdCIsIm1vZGUiLCJ0aXRsZUZvbnRDb2xvciIsInByaW1hcnkiLCJkZXZpY2VzIiwidGl0bGUiLCJ2YWx1ZSIsImNvbG9yIiwic3giLCJoZWlnaHQiLCJwb3NpdGlvbiIsImp1c3RpZnlDb250ZW50IiwicHQiLCJtYXAiLCJpY29uIiwiSWNvbiIsInAiLCJ0ZXh0QWxpZ24iLCJ2YXJpYW50Iiwic3R5bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/dashboard/traffic-by-device.js\n"));

/***/ })

});
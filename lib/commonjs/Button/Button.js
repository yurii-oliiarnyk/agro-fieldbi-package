"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AppButton = props => {
  const {
    title
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, title));
};

exports.AppButton = AppButton;
//# sourceMappingURL=Button.js.map
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);
 
// Add inlineRem configuration for react-native-reusables
config.transformer = {
  ...config.transformer,
  inlineRem: 16
};
 
module.exports = withNativeWind(config, { input: './app/global.css' });
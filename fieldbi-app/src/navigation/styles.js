import { Platform, Dimensions } from 'react-native';
import i18n from 'i18n-js';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

const widthBackButton = 90;
const headerTitleWidth =
  Platform.OS === 'ios' ? width - widthBackButton * 2 : width - widthBackButton;

export const stackNavigationOptions = {
  screenOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? COLORS.MAIN : '#fff'
    },
    headerTitleContainerStyle: {
      maxWidth: headerTitleWidth
    },
    headerTitleAllowFontScaling: true,
    headerTintColor: Platform.OS === 'android' ? '#fff' : COLORS.MAIN,
    headerTruncatedBackTitle: i18n.t('ui.back')
  }
};

const materialBottomTabOptions = {
  barStyle: {
    backgroundColor: COLORS.MAIN
  },
  shifting: false
};

const iosBottomTabOptions = {
  tabBarOptions: {
    activeTintColor: COLORS.MAIN
  }
};

export const bottomTabOptions =
  Platform.OS === 'android' ? materialBottomTabOptions : iosBottomTabOptions;

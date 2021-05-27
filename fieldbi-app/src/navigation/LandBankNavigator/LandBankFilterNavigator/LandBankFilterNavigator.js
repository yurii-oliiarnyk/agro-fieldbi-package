import { useRoute } from '@react-navigation/native';
import { getLandBankFilterScreen } from './config';

const LandBankFilterNavigator = () => {
  const route = useRoute();

  const resourceName = route?.params?.resourceName;
  const screen = getLandBankFilterScreen(resourceName);

  return screen;
};

export default LandBankFilterNavigator;

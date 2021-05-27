import { useRoute } from '@react-navigation/native';
import { getLandBankShowScreen } from './config';

const LandBankShowNavigator = () => {
  const route = useRoute();

  const resourceName = route?.params?.resourceName;
  const screen = getLandBankShowScreen(resourceName);

  return screen;
};

export default LandBankShowNavigator;

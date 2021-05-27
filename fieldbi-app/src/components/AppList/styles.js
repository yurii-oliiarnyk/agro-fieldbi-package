import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  text: {
    fontSize: 15,
    lineHeight: 16
  },
  name: {
    color: COLORS.GREY,
    flex: 2
  },
  value: {
    color: COLORS.BLACK,
    flex: 3,
    paddingLeft: 16
  }
});

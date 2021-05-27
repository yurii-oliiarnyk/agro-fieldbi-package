import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

export default StyleSheet.create({
  table: {
    paddingVertical: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  background: {
    backgroundColor: COLORS.GREY_BG
  },
  column: {
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  text: {
    fontSize: 15,
    lineHeight: 16,
    flexShrink: 1
  },
  name: {
    color: COLORS.GREY
  },
  value: {
    color: COLORS.BLACK,
    textAlign: 'right'
  },
  link: {
    color: COLORS.MAIN
  }
});

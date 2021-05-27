import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const icon = {
  position: 'absolute',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0
};

export default StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16
  },
  input: {
    paddingLeft: 35,
    fontSize: 18,
    height: 48,
    color: COLORS.BLACK,
    borderBottomColor: COLORS.LIGHT,
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  iconLeft: {
    ...icon,
    left: 0
  },
  iconRight: {
    ...icon,
    right: 0
  },
  button: {
    flex: 1,
    width: '100%'
  },
  error: {
    backgroundColor: '#fff1f0',
    padding: 10,
    marginBottom: 8,
    borderColor: '#ffa39e',
    borderWidth: 1,
    borderRadius: 4,
    color: COLORS.BLACK
  },
  logo: {
    alignItems: 'center'
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 27
  }
});

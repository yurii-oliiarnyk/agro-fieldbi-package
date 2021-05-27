import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16
  },
  input: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    width: '100%',
    height: 40,
    marginBottom: 8
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
  form: {
    // flex: 1
  }
});

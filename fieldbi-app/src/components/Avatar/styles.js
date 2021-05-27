import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  avatar: {
    height: '100%',
    width: '100%'
  },
  avatarView: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
      },
      android: {
        elevation: 3
      }
    }),
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff'
  }
});

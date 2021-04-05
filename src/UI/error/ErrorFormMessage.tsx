import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ErrorContext } from './ErrorContext';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff1f0',
    borderColor: '#ffa39e',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 4,
  },
  item: {
    marginVertical: 2,
  },
});

export const ErrorFormMessage: React.FC = () => {
  return (
    <ErrorContext.Consumer>
      {({ messages }) => {
        if (!messages) {
          return null;
        }

        return (
          <View style={styles.wrapper}>
            {messages.map((message, index) => (
              <View key={index} style={styles.item}>
                <Text>{message}</Text>
              </View>
            ))}
          </View>
        );
      }}
    </ErrorContext.Consumer>
  );
};

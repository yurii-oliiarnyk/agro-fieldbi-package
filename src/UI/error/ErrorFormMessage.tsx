import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ErrorContext } from './ErrorContext';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff1f0',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffa39e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 4,
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
          <>
            {messages.map((message, index) => (
              <View key={index} style={styles.item}>
                <Text>{message}</Text>
              </View>
            ))}
          </>
        );
      }}
    </ErrorContext.Consumer>
  );
};

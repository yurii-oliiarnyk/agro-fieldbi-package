import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.wrap}>
          <Text style={styles.title}>Щось пішло не так</Text>
          <Text style={styles.text}>
            Попробуйте оновити додаток до останньої актуальної версії. У випадку повторення помилки
            прошу звернутись до розробників додатку з детальним описом проблеми.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: COLORS.GREY,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default ErrorBoundary;

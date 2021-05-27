import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../../../../constants';

const DomainScreenInput = props => {
  const {
    value,
    setValue,
    onSubmitHandler,
    placeholder,
    prefix,
    suffix,
    inputRef,
    disabled
  } = props;

  const holder = value !== '' ? value : placeholder;
  const color = value !== '' ? COLORS.BLACK : COLORS.GREY;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (inputRef && !inputRef.current.isFocused()) {
          inputRef.current.focus();
        }
      }}
    >
      <View style={styles.wrap}>
        <View style={styles.view}>
          <TextInput
            placeholder={prefix}
            editable={false}
            style={styles.text}
            placeholderTextColor={COLORS.GREY}
          />
          <View
            style={{
              flexShrink: 1
            }}
          >
            <Text style={[styles.text, styles.fakeText, { color }]}>{holder}</Text>
            <TextInput
              ref={inputRef}
              style={[
                styles.text,
                styles.input,
                {
                  color: 'transparent'
                }
              ]}
              value={value}
              onChangeText={setValue}
              onSubmitEditing={onSubmitHandler}
              blurOnSubmit={false}
              editable={!disabled}
              returnKeyType="next"
              autoCapitalize="none"
            />
          </View>
          <TextInput
            placeholder={suffix}
            editable={false}
            style={styles.text}
            placeholderTextColor={COLORS.GREY}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

DomainScreenInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  inputRef: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start'
  },
  view: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  text: {
    padding: 0,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.BLACK
  },
  input: {
    position: 'absolute'
  },
  fakeText: {
    paddingTop: 2
  }
});

export default DomainScreenInput;

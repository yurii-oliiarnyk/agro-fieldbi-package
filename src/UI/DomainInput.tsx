import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../colors';

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    padding: 0,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.BLACK,
  },
  inputView: {
    flexShrink: 1,
  },
  input: {
    position: 'absolute',
    color: 'transparent',
  },
  fakeText: {
    paddingTop: 2,
  },
});

type DomainInputProps = {
  value: string;
  setValue: (value: string) => void;
  prefix: string;
  suffix: string;
  onSubmitHandler: () => void;
};

const placeholder = 'your-domain';

export const DomainInput: React.FC<DomainInputProps> = (props): JSX.Element => {
  const { value, setValue, onSubmitHandler, prefix, suffix } = props;

  const inputRef = useRef<TextInput>(null);

  const holder = value !== '' ? value : placeholder;
  const color = value !== '' ? COLORS.BLACK : COLORS.GREY;

  const onInputWrapperPress = () => {
    inputRef.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={onInputWrapperPress}>
      <View style={styles.wrap}>
        <View style={styles.view}>
          <TextInput
            placeholder={prefix}
            editable={false}
            style={styles.text}
            placeholderTextColor={COLORS.GREY}
            pointerEvents="none"
          />
          <View style={styles.inputView}>
            <Text style={[styles.text, styles.fakeText, { color }]}>{holder}</Text>
            <TextInput
              ref={inputRef}
              style={[styles.text, styles.input]}
              value={value}
              onChangeText={setValue}
              onSubmitEditing={onSubmitHandler}
              blurOnSubmit={false}
              autoCorrect={false}
              autoFocus
              returnKeyType="next"
              autoCapitalize="none"
            />
          </View>
          <TextInput
            placeholder={suffix}
            editable={false}
            style={styles.text}
            placeholderTextColor={COLORS.GREY}
            pointerEvents="none"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

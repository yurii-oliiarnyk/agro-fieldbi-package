import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableFeedback, COLORS, ErrorField } from 'agro-package';
import Icon from 'react-native-vector-icons/AntDesign';

type ImagePickerImageProps = {
  uri: string;
  deleteImage?: () => void;
  errorFieldName?: string;
};

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    marginRight: 8,
  },
  photoWrapper: {
    width: 150,
    height: 150,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.GREY,
  },
  loader: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  delete: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  deleteIcon: {
    fontSize: 14,
  },
});

export const ImagePickerImage: React.FC<ImagePickerImageProps> = props => {
  const { deleteImage, uri, errorFieldName } = props;

  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.photoWrapper}>
        {loading && <ActivityIndicator size="large" color={COLORS.BLACK} style={styles.loader} />}
        <ImageBackground
          style={styles.image}
          source={{ uri: uri }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {typeof deleteImage === 'function' && (
          <TouchableFeedback style={styles.delete} onPress={deleteImage}>
            <Icon name="delete" color="#fff" style={styles.deleteIcon} />
          </TouchableFeedback>
        )}
      </View>
      {errorFieldName && <ErrorField name={errorFieldName} />}
    </View>
  );
};

import React from 'react';
import { showMessage } from 'react-native-flash-message';
import { ScrollView, View } from 'react-native';
import { getLocationPermissions, getDevicePosition } from 'agro-package';
import { launchCamera, ImagePickerResponse, CameraOptions } from 'react-native-image-picker';
import { ImagePickerAdd } from './ImagePickerAdd';
import { ImagePickerImage } from './ImagePickerImage';
import { ImageList } from './ImageList';

export type ImagePickerImageType = {
  fileName: string;
  uri: string;
  type: string;
  key: string;
  point: [number, number];
};

type ImagePickerTypes = {
  name: string;
  images: ImagePickerImageType[];
  addImage: (image: ImagePickerImageType) => void;
  removeImage: (image: ImagePickerImageType) => void;
};

const CAMERA_CONSTRAINT: CameraOptions = {
  mediaType: 'photo',
  quality: 1,
};

export const ImagePicker: React.FC<ImagePickerTypes> = props => {
  const { removeImage, addImage, images, name } = props;

  const takePhotoResponseHandler = (response: ImagePickerResponse) => {
    const { didCancel, errorCode, errorMessage, fileName, uri, type } = response;

    if (didCancel) {
      return;
    }

    if (errorCode || errorMessage) {
      return showMessage({ type: 'danger', message: `${errorCode} - ${errorMessage}` });
    }

    getDevicePosition().then(point => {
      addImage({ fileName, uri, type, key: fileName, point } as ImagePickerImageType);
    });
  };

  const doPhoto = () => {
    getLocationPermissions().then(perm => {
      if (perm) {
        launchCamera(CAMERA_CONSTRAINT, takePhotoResponseHandler);
      }
    });
  };

  return (
    <View>
      {images.length > 0 && (
        <ImageList
          images={images.map((image, index) => ({
            key: image.key,
            uri: image.uri,
            errorFieldName: `${name}.${index}.photo`,
          }))}
          removeImage={removeImage}
        />
      )}
      <ImagePickerAdd onPress={doPhoto} />
    </View>
  );
};

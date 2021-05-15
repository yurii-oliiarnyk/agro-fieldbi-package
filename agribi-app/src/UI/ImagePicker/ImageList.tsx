import React from 'react';
import { ScrollView } from 'react-native';
import { ImagePickerImage } from './ImagePickerImage';

type ImageListProps = {
  images: Array<{ uri: string; key: string; errorFieldName?: string }>;
  removeImage?: (image: any) => void;
};

export const ImageList: React.FC<ImageListProps> = props => {
  const { images, removeImage } = props;

  return (
    <ScrollView horizontal style={{ marginBottom: 8 }}>
      {images.map(image => (
        <ImagePickerImage
          key={image.key}
          uri={image.uri}
          deleteImage={typeof removeImage === 'function' ? () => removeImage(image) : undefined}
          errorFieldName={image.errorFieldName}
        />
      ))}
    </ScrollView>
  );
};

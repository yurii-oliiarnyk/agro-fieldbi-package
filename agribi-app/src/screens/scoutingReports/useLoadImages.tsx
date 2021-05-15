import { useState, useRef } from 'react';
import { showMessage } from 'react-native-flash-message';
import { axios } from 'agro-package';

export const useLoadImages = () => {
  const loadedImages = useRef<{ [key: string]: string }>({});
  const [imagesLoading, setImagesLoading] = useState({
    loading: false,
    loaded: 0,
    total: 0,
  });

  const loadPhoto = (allImages: any[], current = 0) => {
    const image = allImages[current];

    setImagesLoading({
      loading: true,
      loaded: current,
      total: allImages.length,
    });

    if (!image) {
      setImagesLoading({
        loading: false,
        loaded: 0,
        total: 0,
      });

      return;
    }

    const data = new FormData();

    data.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    data.append('type', 'scouting_report');

    if (loadedImages.current[image.uri] || image.loaded) {
      return loadPhoto(allImages, current + 1);
    }

    return axios
      .post('/api/v1/agro/storage/upload', data)
      .then(response => response.data.data)
      .then(savedImage => {
        loadedImages.current = {
          ...loadedImages.current,
          [image.uri]: savedImage.link,
        };

        return loadPhoto(allImages, current + 1);
      })
      .catch(e => showMessage({ type: 'danger', message: 'Не вдалось завантажити фото' }));
  };

  return {
    imagesLoading,
    loadPhoto,
    loadedImages,
  };
};

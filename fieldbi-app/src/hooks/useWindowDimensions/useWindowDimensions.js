import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const update = () => {
      setDimensions(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  return dimensions;
};

export default useWindowDimensions;

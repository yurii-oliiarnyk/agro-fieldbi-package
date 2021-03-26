import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const findBounds = coordinates => {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  coordinates.forEach(([x, y]) => {
    if (x > maxX) {
      maxX = x;
    }

    if (x < minX) {
      minX = x;
    }

    if (y > maxY) {
      maxY = y;
    }

    if (y < minY) {
      minY = y;
    }
  });

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};

const getScaleAndOffset = bounds => {
  const { minX, maxX, minY, maxY } = bounds;

  const distanceX = maxX - minX;
  const distanceY = maxY - minY;

  const maxDistance = Math.max(distanceX, distanceY);
  const scale = 100 / maxDistance; // 1,25

  const getOffset = (distanceA, distanceB) =>
    distanceA > distanceB ? ((distanceA - distanceB) * scale) / 2 : 0;

  const offsetX = getOffset(distanceY, distanceX);
  const offsetY = getOffset(distanceX, distanceY);

  return [scale, offsetX, offsetY];
};

export const ResourcesListItemContour = props => {
  const { color } = props;
  let { coordinates } = props;

  const isCoordinatesValid = coordinates => coordinates && coordinates.length;

  if (!isCoordinatesValid(coordinates)) {
    return (
      <View style={styles.wrapper}>
        <Text style={{ color, fontSize: 20 }}>БК</Text>
      </View>
    );
  }

  [coordinates] = coordinates;

  const bounds = findBounds(coordinates);
  const [scale, offsetX, offsetY] = getScaleAndOffset(bounds);

  coordinates = coordinates.map(([x, y]) => [
    Number((x - bounds.minX) * scale).toFixed(0) + offsetX,
    100 - Number((y - bounds.minY) * scale).toFixed(0) + offsetY,
  ]);

  const d = coordinates.map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <View style={styles.wrapper}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Polygon points={d} fill={color} stroke={color} strokeWidth="1" fillOpacity="0.05" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
});

ResourcesListItemContour.propTypes = {
  coordinates: PropTypes.array,
  color: PropTypes.string.isRequired,
};

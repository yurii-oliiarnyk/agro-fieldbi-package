import * as turf from '@turf/turf';

export const centerOfPoligon = coordinates => {
  const polygon = turf.polygon(coordinates);
  const center = turf.pointOnFeature(polygon);

  return center.geometry.coordinates;
};

export const centerOfPoligons = entities => {
  const points = [];

  entities.forEach(entitie => {
    if (
      entitie.coordinates &&
      entitie.coordinates.length > 0 &&
      entitie.coordinates[0].length > 3
    ) {
      const polygon = turf.polygon(entitie.coordinates);

      points.push(turf.pointOnFeature(polygon));
    }
  });

  const featureCollection = turf.featureCollection(points);

  const hull = turf.convex(featureCollection, { units: 'miles', maxEdge: 1 });

  return hull.geometry.coordinates;
};

export const getFitBounds = coordinates => {
  const featCollection = {
    type: 'FeatureCollection',
    features: []
  };

  coordinates.forEach(coordinate => {
    if (coordinate[0].length > 3) {
      const polygon = turf.polygon(coordinate);
      featCollection.features.push(polygon);
    }
  });

  const bbox = turf.bbox(featCollection);

  return bbox;
};

export const getMapGeoJsonData = entities => {
  const data = {
    type: 'FeatureCollection',
    features: []
  };

  entities.forEach(entitie => {
    data.features.push({
      type: 'Feature',
      properties: {
        id: entitie.id,
        place: entitie.name ?? entitie.landNumber
      },
      geometry: {
        type: 'Polygon',
        coordinates: entitie.coordinates
      }
    });
  });

  return data;
};

export const getFieldsNameGeoJsonData = fields => {
  const data = {
    type: 'FeatureCollection',
    features: []
  };

  fields.forEach(field => {
    if (field.coordinates.length) {
      try {
        data.features.push({
          type: 'Feature',
          properties: {
            place: field.name
          },
          geometry: {
            type: 'Point',
            coordinates: centerOfPoligon(field.coordinates)
          }
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Field - ${field.id} have unvalid coordinates`, e);
      }
    }
  });

  return data;
};

export const getLandsNameGeoJsonData = lands => {
  const data = {
    type: 'FeatureCollection',
    features: []
  };

  lands.forEach(land => {
    if (land.coordinates.length) {
      try {
        const landDisplayName = land.landNumber;

        data.features.push({
          type: 'Feature',
          properties: {
            place: landDisplayName
          },
          geometry: {
            type: 'Point',
            coordinates: centerOfPoligon(land.coordinates)
          }
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Field - ${land.id} have unvalid coordinates`, e);
      }
    }
  });

  return data;
};

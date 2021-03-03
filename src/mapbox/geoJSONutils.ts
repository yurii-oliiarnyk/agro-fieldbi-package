/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as turf from '@turf/turf';

type PointType = [number, number];
type PolygonType = Array<Array<PointType>>;

export const centerOfPoligon = (coordinates: PolygonType) => {
  const polygon = turf.polygon(coordinates);
  const center = turf.pointOnFeature(polygon);

  return center.geometry.coordinates;
};

export const getFitBounds = (coordinates: PolygonType[]) => {
  const featCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  coordinates.forEach((coordinate: PolygonType) => {
    if (coordinate[0].length > 3) {
      const polygon = turf.polygon(coordinate);
      featCollection.features.push(polygon);
    }
  });

  const bbox = turf.bbox(featCollection);

  return bbox;
};

export const getMapGeoJsonData = (entities: any[]) => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  };

  entities.forEach((entitie: { id: any; name: any; landNumber: any; coordinates: any }) => {
    data.features.push({
      type: 'Feature',
      properties: {
        id: entitie.id,
        place: entitie.name ?? entitie.landNumber,
      },
      geometry: {
        type: 'Polygon',
        coordinates: entitie.coordinates,
      },
    });
  });

  return data;
};

export const getFieldsNameGeoJsonData = (
  fields: { id: number; coordinates: PolygonType; name: string }[]
) => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  };

  fields.forEach(field => {
    if (field.coordinates.length) {
      try {
        data.features.push({
          type: 'Feature',
          properties: {
            place: field.name,
          },
          geometry: {
            type: 'Point',
            coordinates: centerOfPoligon(field.coordinates),
          },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Field - ${field.id} have unvalid coordinates`, e);
      }
    }
  });

  return data;
};

export const getLandsNameGeoJsonData = (
  lands: { id: number; coordinates: PolygonType; landNumber: string }[]
) => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  };

  lands.forEach(land => {
    if (land.coordinates.length) {
      try {
        const landDisplayName = land.landNumber;

        data.features.push({
          type: 'Feature',
          properties: {
            place: landDisplayName,
          },
          geometry: {
            type: 'Point',
            coordinates: centerOfPoligon(land.coordinates),
          },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Field - ${land.id} have unvalid coordinates`, e);
      }
    }
  });

  return data;
};

import * as turf from '@turf/turf';
import { BBox, Position } from '@turf/helpers';

type PolygonType = Position[][];

export const centerOfPoligon = (coordinates: PolygonType): Position => {
  const polygon = turf.polygon(coordinates);
  const center = turf.pointOnFeature(polygon);

  return center.geometry.coordinates;
};

export const getFitBounds = (coordinates: PolygonType[]): BBox => {
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

export const getMapGeoJsonData = (entities: (LandType & FieldType)[]) => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  };

  entities.forEach(entitie => {
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

type FieldType = {
  id: number;
  coordinates: PolygonType;
  name: string;
};

export const getFieldsNameGeoJsonData = (fields: FieldType[]) => {
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

type LandType = {
  id: number;
  coordinates: PolygonType;
  landNumber: string;
};

export const getLandsNameGeoJsonData = (lands: LandType[]) => {
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

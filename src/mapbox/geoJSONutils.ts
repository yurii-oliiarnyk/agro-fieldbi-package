import { polygon as turfPolygon, pointOnFeature, bbox as turfBbox } from '@turf/turf';
import { BBox, Position, Feature, FeatureCollection, Geometry } from '@turf/helpers';

export type PolygonType = Position[][];

export type GeomentryEntity = {
  id: number;
  coordinates: Position[][];
};

export type LandType = GeomentryEntity & {
  landNumber: string;
};

export type FieldType = GeomentryEntity & {
  name: string;
};

export const isCoordinatesValid = (coordinates?: PolygonType): boolean => {
  return !!coordinates && coordinates.length > 0 && coordinates[0].length > 3;
};

export const centerOfPoligon = (coordinates: PolygonType): Position => {
  const polygon = turfPolygon(coordinates);
  const center = pointOnFeature(polygon);

  return center.geometry.coordinates;
};

export const getFitBounds = (coordinates: PolygonType[]): BBox => {
  const featCollection = {
    type: 'FeatureCollection',
    features: [] as Feature[],
  };

  coordinates
    .filter(polygon => isCoordinatesValid(polygon))
    .forEach(coordinate => {
      const polygon = turfPolygon(coordinate);
      featCollection.features.push(polygon);
    });

  const bbox = turfBbox(featCollection);

  return bbox;
};

export type MonitoringCenterFeatureCollection = FeatureCollection<
  Geometry,
  { place: string; id: number }
>;

export const getMapGeoJsonData = (
  entities: (LandType | FieldType)[]
): MonitoringCenterFeatureCollection => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  } as MonitoringCenterFeatureCollection;

  entities
    .filter(entity => isCoordinatesValid(entity.coordinates))
    .forEach(entitie => {
      data.features.push({
        type: 'Feature',
        properties: {
          id: entitie.id,
          place: (entitie as FieldType).name ?? (entitie as LandType).landNumber,
        },
        geometry: {
          type: 'Polygon',
          coordinates: entitie.coordinates as PolygonType,
        },
      });
    });

  return data;
};

export const getFieldsNameGeoJsonData = (
  fields: FieldType[]
): MonitoringCenterFeatureCollection => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  } as MonitoringCenterFeatureCollection;

  fields
    .filter(field => isCoordinatesValid(field.coordinates))
    .forEach(field => {
      data.features.push({
        type: 'Feature',
        properties: {
          id: field.id,
          place: field.name,
        },
        geometry: {
          type: 'Point',
          coordinates: centerOfPoligon(field.coordinates as PolygonType),
        },
      });
    });

  return data;
};

export const getLandsNameGeoJsonData = (lands: LandType[]): MonitoringCenterFeatureCollection => {
  const data = {
    type: 'FeatureCollection',
    features: [],
  } as MonitoringCenterFeatureCollection;

  lands
    .filter(land => isCoordinatesValid(land.coordinates))
    .forEach(land => {
      data.features.push({
        type: 'Feature',
        properties: {
          id: land.id,
          place: land.landNumber,
        },
        geometry: {
          type: 'Point',
          coordinates: centerOfPoligon(land.coordinates as PolygonType),
        },
      });
    });

  return data;
};

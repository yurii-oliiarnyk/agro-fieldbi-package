import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

const CadastralLayer: React.FC = (): JSX.Element => {
  return (
    <MapboxGL.RasterSource
      id="cadastral"
      tileUrlTemplates={[
        'https://map.land.gov.ua/geowebcache/service/wms?tiled=true&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=kadastr&TILED=true&STYLES=&SRS=EPSG%3A900913&WIDTH=256&HEIGHT=256&CRS=EPSG%3A900913&BBOX={bbox-epsg-3857}',
      ]}
      tileSize={256}
    >
      <MapboxGL.RasterLayer id="cadastral" />
    </MapboxGL.RasterSource>
  );
};

export default CadastralLayer;

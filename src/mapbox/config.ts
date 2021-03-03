export const TOKEN =
  'pk.eyJ1Ijoic3Rhc2hhcmFiYXJhIiwiYSI6ImNqeWg3eHY4NzA4Y28zbW54ZWNoY3YyY2kifQ.xBTHmk1pQFOZ9f5AMGyAJQ';

export const styles = {
  default: 'mapbox://styles/stasharabara/cjyztjq000j411cnjkj9d3mp4',
  satellite: 'mapbox://styles/stasharabara/ck89yb3bg0dyg1io21c9sqedl',
};

export const satelliteTiles = [
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
];

export const defaultCenter = [31.1828699, 48.383022];
export const defaultZoom = 4;
export const defaultBbox = [21.51123046875, 49.439556958940855, 40.80322265625, 49.25346477497736];
export const defaultMaxZoomLevel = 15;

export type LayerStyleType = 'satellite' | 'default';

export const getLayerStyle = (style: LayerStyleType) => {
  const fieldTextColor = style === 'satellite' ? '#fff' : '#111';
  const landsMarkerColor = style === 'default' ? '#111' : '#fff';

  return {
    fields: {
      paint: {
        fillColor: '#BDEBB4',
        fillOutlineColor: '#1ED700',
        fillOpacity: 0.4,
      },
      symbolLayout: {
        textField: '{place}',
        textFont: ['Open Sans Regular'],
        textSize: ['interpolate', ['linear'], ['zoom'], 13, 9, 18, 18],
        textAnchor: 'top',
        textColor: fieldTextColor,
      },
      marker: {
        color: '#00A1FF',
      },
    },
    lands: {
      paint: {
        fillColor: '#00A1FF',
        fillOutlineColor: '#00A1FF',
        fillOpacity: 0.4,
      },
      marker: {
        color: landsMarkerColor,
      },
    },
    selected: {
      paint: {
        fillColor: '#f64a4a',
        fillOutlineColor: '#f64a4a',
        fillOpacity: 0.4,
      },
    },
  };
};

export type LayerStyle = ReturnType<typeof getLayerStyle>;
